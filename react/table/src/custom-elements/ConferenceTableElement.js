import React from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';

import setLocale from 'i18n/setLocale';
import {
  createWidgetEventPublisher,
  subscribeToWidgetEvents,
  widgetEventToFSA,
} from 'helpers/widgetEvents';

import { INPUT_EVENT_TYPES, OUTPUT_EVENT_TYPES } from 'custom-elements/widgetEventTypes';
import ConferenceTableContainer from 'components/ConferenceTableContainer';

const ATTRIBUTES = {
  hidden: 'hidden',
  locale: 'locale',
  disableDefaultEventHandler: 'disable-default-event-handler', // custom element attribute names MUST be written in kebab-case
};
class ConferenceTableElement extends HTMLElement {
  jss;

  mountPoint;

  unsubscribeFromWidgetEvents;

  onAdd = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.add);

  onError = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.error);

  onSelect = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.select);

  reactRootRef = React.createRef();

  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
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

    this.render();

    retargetEvents(shadowRoot);
  }

  disconnectedCallback() {
    if (this.unsubscribeFromWidgetEvents) {
      this.unsubscribeFromWidgetEvents();
    }
  }

  defaultWidgetEventHandler() {
    return evt => {
      const action = widgetEventToFSA(evt);
      this.reactRootRef.current.dispatch(action);
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
    } else if (this.unsubscribeFromWidgetEvents) {
      this.unsubscribeFromWidgetEvents();
    }

    ReactDOM.render(
      <StylesProvider jss={this.jss}>
        <ConferenceTableContainer
          ref={this.reactRootRef}
          onAdd={this.onAdd}
          onSelect={this.onSelect}
          onError={this.onError}
        />
      </StylesProvider>,
      this.mountPoint
    );
  }
}

customElements.define('conference-table', ConferenceTableElement);
