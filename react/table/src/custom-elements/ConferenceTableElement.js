import React from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';

import KeycloakContext from 'auth/KeycloakContext';
import { PaginationProvider } from 'components/pagination/PaginationContext';
import ConferenceTableContainer from 'components/ConferenceTableContainer';
import setLocale from 'i18n/setLocale';
import {
  createWidgetEventPublisher,
  subscribeToWidgetEvents,
  subscribeToWidgetEvent,
  widgetEventToFSA,
} from 'helpers/widgetEvents';
import {
  INPUT_EVENT_TYPES,
  OUTPUT_EVENT_TYPES,
  KEYCLOAK_EVENT_TYPE,
} from 'custom-elements/widgetEventTypes';

const getKeycloakInstance = () =>
  (window &&
    window.entando &&
    window.entando.keycloak && { ...window.entando.keycloak, initialized: true }) || {
    initialized: false,
  };

const ATTRIBUTES = {
  locale: 'locale',
  paginationMode: 'pagination-mode',
  overrideEventHandler: 'override-event-handler', // custom element attribute names MUST be written in kebab-case
};

class ConferenceTableElement extends HTMLElement {
  constructor() {
    super();
    this.jss = null;
    this.mountPoint = null;
    this.unsubscribeFromWidgetEvents = null;
    this.unsubscribeFromKeycloakEvent = null;
    this.keycloak = getKeycloakInstance();
    this.onAdd = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.add);
    this.onError = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.error);
    this.onSelect = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.select);
    this.reactRootRef = React.createRef();
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

    this.jss = create({
      ...jssPreset(),
      insertionPoint: this.mountPoint,
    });

    this.keycloak = { ...getKeycloakInstance(), initialized: true };

    this.unsubscribeFromKeycloakEvent = subscribeToWidgetEvent(KEYCLOAK_EVENT_TYPE, () => {
      this.keycloak = { ...getKeycloakInstance(), initialized: true };
      this.render();
    });

    const defaultWidgetEventHandler = this.defaultWidgetEventHandler();

    this.unsubscribeFromWidgetEvents = subscribeToWidgetEvents(
      Object.values(INPUT_EVENT_TYPES),
      defaultWidgetEventHandler
    );

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
      const { overrideEventHandler } = ATTRIBUTES;

      if (!this.isAttributeTruthy(overrideEventHandler)) {
        const action = widgetEventToFSA(evt);
        this.reactRootRef.current.dispatch(action);
      }
    };
  }

  render() {
    const locale = this.getAttribute(ATTRIBUTES.locale);
    setLocale(locale);

    const paginationMode = this.getAttribute(ATTRIBUTES.paginationMode) || '';

    ReactDOM.render(
      <KeycloakContext.Provider value={this.keycloak}>
        <StylesProvider jss={this.jss}>
          <PaginationProvider paginationMode={paginationMode}>
            <ConferenceTableContainer
              ref={this.reactRootRef}
              onAdd={this.onAdd}
              onSelect={this.onSelect}
              onError={this.onError}
              paginationMode={paginationMode}
            />
          </PaginationProvider>
        </StylesProvider>
      </KeycloakContext.Provider>,
      this.mountPoint
    );
  }
}

customElements.define('conference-table', ConferenceTableElement);
