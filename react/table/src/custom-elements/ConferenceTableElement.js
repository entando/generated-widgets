import setLocale from 'i18n/setLocale';
import {
  createWidgetEventPublisher,
  subscribeToWidgetEvents,
  widgetEventToFSA,
} from 'helpers/widgetEvents';

import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceTableContainer from 'components/ConferenceTableContainer';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import retargetEvents from 'react-shadow-dom-retarget-events';

const ATTRIBUTES = {
  hidden: 'hidden',
  locale: 'locale',
  disableEventHandler: 'disableEventHandler',
};

const EVENT_TYPES = {
  input: {
    formUpdate: 'conference.form.update',
    formCreate: 'conference.form.create',
    formDelete: 'conference.form.delete',
  },
  output: {
    select: 'conference.table.select',
    add: 'conference.table.add',
    error: 'conference.table.error',
  },
};

class ConferenceTableElement extends HTMLElement {
  jss;

  mountPoint;

  unsubscribeFromWidgetEvents;

  onAdd = createWidgetEventPublisher(EVENT_TYPES.output.add);

  onError = createWidgetEventPublisher(EVENT_TYPES.output.error);

  onSelect = createWidgetEventPublisher(EVENT_TYPES.output.select);

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
      this.render(action);
    };
  }

  render(action) {
    const hidden = this.getAttribute(ATTRIBUTES.hidden) === 'true';
    if (hidden) {
      return;
    }

    const locale = this.getAttribute(ATTRIBUTES.locale);
    setLocale(locale);

    const disableEventHandler = this.getAttribute(ATTRIBUTES.disableEventHandler) === 'true';
    if (!disableEventHandler) {
      const defaultWidgetEventHandler = this.defaultWidgetEventHandler();

      this.unsubscribeFromWidgetEvents = subscribeToWidgetEvents(
        Object.values(EVENT_TYPES.input),
        defaultWidgetEventHandler
      );
    }

    ReactDOM.render(
      <StylesProvider jss={this.jss}>
        <ConferenceTableContainer
          action={action}
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
