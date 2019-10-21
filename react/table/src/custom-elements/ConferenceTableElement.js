import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceTableContainer from 'components/ConferenceTableContainer';
import setLocale from 'i18n/setLocale';
import {
  publishWidgetEvent,
  subscribeToWidgetEvents,
  widgetEventToFSA,
} from 'helpers/widgetEvents';

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
  mountPoint;

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);

    const locale = this.getAttribute('locale');
    setLocale(locale);

    const handleWidgetEvent = evt => {
      const action = widgetEventToFSA(evt);
      this.render(action);
    };

    this.unsubscribeFromWidgetEvents = subscribeToWidgetEvents(
      Object.values(EVENT_TYPES.input),
      handleWidgetEvent
    );

    this.render();
  }

  render(action) {
    const onError = payload => publishWidgetEvent(EVENT_TYPES.output.error, payload);
    const onSelect = payload => publishWidgetEvent(EVENT_TYPES.output.select, payload);
    const onAdd = payload => publishWidgetEvent(EVENT_TYPES.output.add, payload);

    const reactRoot = React.createElement(
      ConferenceTableContainer,
      { onError, onSelect, onAdd, action },
      null
    );

    ReactDOM.render(reactRoot, this.mountPoint);
  }
}

customElements.define('conference-table', ConferenceTableElement);
