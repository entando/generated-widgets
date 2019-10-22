import setLocale from 'i18n/setLocale';
import { createWidgetEventPublisher, subscribeToWidgetEvents } from 'helpers/widgetEvents';

import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';
import { INPUT_EVENT_TYPES, OUTPUT_EVENT_TYPES } from 'custom-elements/widgetEventTypes';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import retargetEvents from 'react-shadow-dom-retarget-events';
import MountPointContext from 'components/MountPointContext';

const ATTRIBUTES = {
  id: 'id',
  hidden: 'hidden',
  locale: 'locale',
  disableDefaultEventHandler: 'disable-default-event-handler', // custom element attribute names MUST be written in kebab-case
};

class ConferenceFormElement extends HTMLElement {
  jss;

  mountPoint;

  unsubscribeFromWidgetEvents;

  onCreate = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.create);

  onUpdate = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.update);

  onErrorCreate = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.errorCreate);

  onErrorUpdate = createWidgetEventPublisher(OUTPUT_EVENT_TYPES.errorUpdate);

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
      const { tableAdd, tableSelect } = INPUT_EVENT_TYPES;
      const { id } = ATTRIBUTES;
      switch (evt.type) {
        case tableAdd: {
          this.setAttribute(id, '');
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
      ReactDOM.render(<></>);
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

    const id = this.getAttribute(ATTRIBUTES.id);

    const FormContainer = id
      ? React.createElement(
          ConferenceEditFormContainer,
          { id, onUpdate: this.onUpdate, onError: this.onErrorUpdate },
          null
        )
      : React.createElement(
          ConferenceAddFormContainer,
          { onCreate: this.onCreate, onError: this.onErrorCreate },
          null
        );

    ReactDOM.render(
      <StylesProvider jss={this.jss}>
        <MountPointContext.Provider value={this.mountPoint}>
          {FormContainer}
        </MountPointContext.Provider>
      </StylesProvider>,
      this.mountPoint
    );
  }
}

customElements.define('conference-form', ConferenceFormElement);
