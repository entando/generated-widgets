import React from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

import { StylesProvider, ThemeProvider, jssPreset } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';
import { create } from 'jss';

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
  hidden: 'hidden',
  locale: 'locale',
  disableDefaultEventHandler: 'disable-default-event-handler', // custom element attribute names MUST be written in kebab-case
};

class ConferenceFormElement extends HTMLElement {
  constructor() {
    super();
    this.muiTheme = null;
    this.jss = null;
    this.mountPoint = null;
    this.keycloak = getKeycloakInstance();
    this.unsubscribeFromWidgetEvents = null;
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
    const val = this.getAttribute(attribute);
    return val !== undefined && val !== null && val !== 'false';
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

    this.jss = create({
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

    this.render();

    retargetEvents(shadowRoot);
  }

  disconnectedCallback() {
    if (this.unsubscribeFromWidgetEvents) {
      this.unsubscribeFromWidgetEvents();
    }
    if (this.unsubscribeFromKeycloakEvent) {
      this.unsubscribeFromKeycloakEvent();
    }
  }

  defaultWidgetEventHandler() {
    return evt => {
      const { tableAdd, cancelEditing, create, edit, tableSelect, update } = INPUT_EVENT_TYPES;
      const { id, hidden } = ATTRIBUTES;

      switch (evt.type) {
        case tableAdd: {
          this.removeAttribute(hidden);
          this.setAttribute(id, '');
          break;
        }
        case edit: {
          this.removeAttribute(hidden);
          this.setAttribute(id, evt.detail.payload.id);
          break;
        }
        case create:
        case cancelEditing:
        case update: {
          this.setAttribute(hidden, true);
          break;
        }
        case tableSelect: {
          this.setAttribute(hidden, true);
          this.setAttribute(id, evt.detail.payload.id);
          break;
        }
        default:
          throw new Error(`Unsupported event: ${evt.type}`);
      }
    };
  }

  render() {
    const hidden = this.isAttributeTruthy(ATTRIBUTES.hidden);
    if (hidden) {
      ReactDOM.render(<></>, this.mountPoint);
      return;
    }

    const locale = this.getAttribute(ATTRIBUTES.locale);
    setLocale(locale);

    if (this.unsubscribeFromWidgetEvents) {
      this.unsubscribeFromWidgetEvents();
    }

    const disableEventHandler = this.isAttributeTruthy(ATTRIBUTES.disableDefaultEventHandler);
    if (!disableEventHandler) {
      const defaultWidgetEventHandler = this.defaultWidgetEventHandler();

      this.unsubscribeFromWidgetEvents = subscribeToWidgetEvents(
        Object.values(INPUT_EVENT_TYPES),
        defaultWidgetEventHandler
      );
    }

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
