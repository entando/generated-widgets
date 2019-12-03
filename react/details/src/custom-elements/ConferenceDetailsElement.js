import React from 'react';
import ReactDOM from 'react-dom';

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
  hidden: 'hidden',
  locale: 'locale',
  disableDefaultEventHandler: 'disable-default-event-handler', // custom element attribute names MUST be written in kebab-case
};

class ConferenceDetailsElement extends HTMLElement {
  constructor() {
    super();

    this.mountPoint = null;
    this.unsubscribeFromKeycloakEvent = null;
    this.onError = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.error);
    this.keycloak = getKeycloakInstance();
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');

    //TODO add shadow root

    this.appendChild(this.mountPoint);

    this.keycloak = { ...getKeycloakInstance(), initialized: true };

    this.unsubscribeFromKeycloakEvent = subscribeToWidgetEvent(KEYCLOAK_EVENT_TYPE, () => {
      this.keycloak = { ...getKeycloakInstance(), initialized: true };
      this.render();
    });

    this.render();
  }

  defaultWidgetEventHandler() {
    return evt => {
      const { formCreate, formUpdate, tableSelect } = INPUT_EVENT_TYPES;
      const { id } = ATTRIBUTES;
      switch (evt.type) {
        case formCreate: {
          this.setAttribute(id, '');
          break;
        }
        case formUpdate: {
          this.render();
          break;
        }
        case tableSelect: {
          this.setAttribute(id, evt.detail.payload.id);
          break;
        }
        default:
          throw new Error(`Unsupported event: ${evt.type}`);
      }
    };
  }

  render() {
    const hidden = this.getAttribute(ATTRIBUTES.hidden) === 'true';
    if (hidden) {
      return;
    }

    const locale = this.getAttribute(ATTRIBUTES.locale);
    setLocale(locale);

    const disableEventHandler = this.getAttribute(ATTRIBUTES.disableDefaultEventHandler) === 'true';
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

    const id = this.getAttribute('id');
    const onError = this.onError;

    const ReactComponent = React.createElement(ConferenceDetailsContainer, {
      id,
      onError,
    });
    ReactDOM.render(
      <KeycloakContext.Provider value={this.keycloak}>{ReactComponent}</KeycloakContext.Provider>,
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
