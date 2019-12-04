import React from 'react';
import ReactDOM from 'react-dom';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';

import { KeycloakContext } from 'auth/KeycloakContext';
import ConferenceDetailsContainer from 'components/ConferenceDetailsContainer';
import {
  subscribeToWidgetEvent,
  createWidgetEventPublisher,
  subscribeToWidgetEvents,
} from 'helpers/widgetEvents';
import {
  KEYCLOAK_EVENT_TYPE,
  OUTPUT_EVENT_TYPES,
  INPUT_EVENT_TYPES,
} from 'custom-elements/widgetEventTypes';
import setLocale from 'i18n/setLocale';

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
  hideEditButton: 'hide-edit-button',
};

class ConferenceDetailsElement extends HTMLElement {
  constructor() {
    super();

    this.mountPoint = null;
    this.unsubscribeFromKeycloakEvent = null;
    this.onError = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.error);
    this.onEdit = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.edit);
    this.keycloak = getKeycloakInstance();
  }

  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
  }

  isAttributeTruthy(attribute) {
    return ['true', ''].includes(this.getAttribute(attribute));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.mountPoint || oldValue === newValue) {
      return;
    }
    if (!Object.values(ATTRIBUTES).includes(name)) {
      throw new Error(`Untracked changed attribute: ${name}`);
    }
    this.render();
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);

    this.jss = create({
      ...jssPreset(),
      insertionPoint: this.mountPoint,
    });

    this.keycloak = { ...getKeycloakInstance(), initialized: true };

    this.unsubscribeFromKeycloakEvent = subscribeToWidgetEvent(KEYCLOAK_EVENT_TYPE, () => {
      this.keycloak = { ...getKeycloakInstance(), initialized: true };
      this.render();
    });

    this.render();
  }

  defaultWidgetEventHandler() {
    return evt => {
      const { formCancelEdit, formCreate, formUpdate, tableSelect } = INPUT_EVENT_TYPES;
      const { id, hidden } = ATTRIBUTES;
      switch (evt.type) {
        case formCreate: {
          this.setAttribute(hidden, false);
          this.setAttribute(id, evt.detail.payload.id);
          break;
        }
        case formCancelEdit: {
          this.setAttribute(hidden, false);
          break;
        }
        case formUpdate: {
          this.setAttribute(hidden, false);
          this.render();
          break;
        }
        case tableSelect: {
          this.setAttribute(hidden, false);
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
      return;
    }

    const locale = this.getAttribute(ATTRIBUTES.locale);
    setLocale(locale);

    const disableEventHandler = this.isAttributeTruthy(ATTRIBUTES.disableDefaultEventHandler);
    if (!disableEventHandler) {
      const defaultWidgetEventHandler = this.defaultWidgetEventHandler();

      this.unsubscribeFromWidgetEvents = subscribeToWidgetEvents(
        Object.values(INPUT_EVENT_TYPES),
        defaultWidgetEventHandler
      );
    } else {
      if (this.unsubscribeFromWidgetEvents) {
        this.unsubscribeFromWidgetEvents();
      }
      if (this.unsubscribeFromKeycloakEvent) {
        this.unsubscribeFromKeycloakEvent();
      }
    }

    const id = this.getAttribute(ATTRIBUTES.id);
    const hideEditButton = this.isAttributeTruthy(ATTRIBUTES.hideEditButton);

    ReactDOM.render(
      <KeycloakContext.Provider value={this.keycloak}>
        <StylesProvider jss={this.jss}>
          <ConferenceDetailsContainer
            id={id}
            onError={this.onError}
            onEdit={this.onEdit}
            hideEditButton={hideEditButton}
          />
        </StylesProvider>
      </KeycloakContext.Provider>,
      this.mountPoint
    );
  }

  disconnectedCallback() {
    if (this.unsubscribeFromKeycloakEvent) {
      this.unsubscribeFromKeycloakEvent();
    }
  }
}

customElements.define('conference-details', ConferenceDetailsElement);
