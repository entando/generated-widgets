import React from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

import { StylesProvider, ThemeProvider, jssPreset } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';
import { create as jssCreate } from 'jss';

import { KeycloakContext } from 'auth/KeycloakContext';
import setLocale from 'i18n/setLocale';
import {
  createWidgetEventPublisher,
  subscribeToWidgetEvent,
  subscribeToWidgetEvents,
} from 'helpers/widgetEvents';
import {
  INPUT_EVENT_TYPES,
  OUTPUT_EVENT_TYPES,
  KEYCLOAK_EVENT_TYPE,
} from 'custom-elements/widgetEventTypes';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';

const getKeycloakInstance = () =>
  (window &&
    window.entando &&
    window.entando.keycloak && { ...window.entando.keycloak, initialized: true }) || {
    initialized: false,
  };

const ATTRIBUTES = {
  id: 'id',
  locale: 'locale',
  overrideEventHandler: 'override-event-handler', // custom element attribute names MUST be written in kebab-case
};

class ConferenceFormElement extends HTMLElement {
  constructor() {
    super();
    this.muiTheme = null;
    this.jss = null;
    this.mountPoint = null;
    this.keycloak = getKeycloakInstance();
    this.unsubscribeFromDefaultWidgetEvents = null;
    this.unsubscribeFromKeycloakEvent = null;
    this.onCreate = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.create);
    this.onCancelEditing = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.cancelEditing);
    this.onUpdate = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.update);
    this.onErrorCreate = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.errorCreate);
    this.onErrorUpdate = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.errorUpdate);
  }

  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
  }

  isAttributeTruthy(attribute) {
    return this.hasAttribute(attribute) && this.getAttribute(attribute) !== 'false';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!Object.values(ATTRIBUTES).includes(name)) {
      throw new Error(`Untracked changed attribute: ${name}`);
    }
    if (this.mountPoint && newValue !== oldValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);

    this.jss = jssCreate({
      ...jssPreset(),
      insertionPoint: this.mountPoint,
    });

    this.muiTheme = createMuiTheme({
      props: {
        MuiDialog: {
          container: this.mountPoint,
        },
        MuiPopover: {
          container: this.mountPoint,
        },
      },
    });

    this.keycloak = { ...getKeycloakInstance(), initialized: true };

    this.unsubscribeFromKeycloakEvent = subscribeToWidgetEvent(KEYCLOAK_EVENT_TYPE, () => {
      this.keycloak = { ...getKeycloakInstance(), initialized: true };
      this.render();
    });

    const defaultWidgetEventHandler = this.defaultWidgetEventHandler();

    this.unsubscribeFromDefaultWidgetEvents = subscribeToWidgetEvents(
      Object.values(INPUT_EVENT_TYPES),
      defaultWidgetEventHandler
    );

    this.render();

    retargetEvents(shadowRoot);
  }

  disconnectedCallback() {
    if (this.unsubscribeFromDefaultWidgetEvents) {
      this.unsubscribeFromDefaultWidgetEvents();
    }
    if (this.unsubscribeFromKeycloakEvent) {
      this.unsubscribeFromKeycloakEvent();
    }
  }

  defaultWidgetEventHandler() {
    return evt => {
      const { tableAdd, cancelEditing, create, edit, tableSelect, update } = INPUT_EVENT_TYPES;
      const { id, overrideEventHandler } = ATTRIBUTES;

      if (!this.isAttributeTruthy(overrideEventHandler)) {
        switch (evt.type) {
          case tableAdd: {
            this.hidden = false;
            this.setAttribute(id, '');
            break;
          }
          case edit: {
            this.hidden = false;
            this.setAttribute(id, evt.detail.payload.id);
            break;
          }
          case create:
          case cancelEditing:
          case update: {
            this.hidden = true;
            break;
          }
          case tableSelect: {
            this.hidden = true;
            this.setAttribute(id, evt.detail.payload.id);
            break;
          }
          default:
            throw new Error(`Unsupported event: ${evt.type}`);
        }
      }
    };
  }

  render() {
    const locale = this.getAttribute(ATTRIBUTES.locale);
    setLocale(locale);

    const id = this.getAttribute(ATTRIBUTES.id);

    const FormContainer = id
      ? React.createElement(
          ConferenceEditFormContainer,
          {
            id,
            onUpdate: this.onUpdate,
            onError: this.onErrorUpdate,
            onCancelEditing: this.onCancelEditing,
          },
          null
        )
      : React.createElement(
          ConferenceAddFormContainer,
          {
            onCreate: this.onCreate,
            onError: this.onErrorCreate,
            onCancelEditing: this.onCancelEditing,
          },
          null
        );

    ReactDOM.render(
      <KeycloakContext.Provider value={this.keycloak}>
        <StylesProvider jss={this.jss}>
          <ThemeProvider theme={this.muiTheme}>{FormContainer}</ThemeProvider>
        </StylesProvider>
      </KeycloakContext.Provider>,
      this.mountPoint
    );
  }
}

customElements.define('conference-form', ConferenceFormElement);
