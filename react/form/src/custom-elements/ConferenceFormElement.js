import setLocale from 'i18n/setLocale';
import { createWidgetEventPublisher, subscribeToWidgetEvents } from 'helpers/widgetEvents';

import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import retargetEvents from 'react-shadow-dom-retarget-events';
import MountPointContext from 'components/MountPointContext';

const ATTRIBUTES = {
  id: 'id',
  hidden: 'hidden',
  locale: 'locale',
  disableEventHandler: 'disableEventHandler',
};

const EVENT_TYPES = {
  input: {
    tableAdd: 'conference.table.add',
    tableSelect: 'conference.table.select',
  },
  output: {
    create: 'conference.form.create',
    update: 'conference.form.update',
    errorCreate: 'conference.form.errorCreate',
    errorUpdate: 'conference.form.errorUpdate',
  },
};

class ConferenceFormElement extends HTMLElement {
  jss;

  mountPoint;

  unsubscribeFromWidgetEvents;

  onCreate = createWidgetEventPublisher(EVENT_TYPES.output.create);

  onUpdate = createWidgetEventPublisher(EVENT_TYPES.output.update);

  onErrorCreate = createWidgetEventPublisher(EVENT_TYPES.output.errorCreate);

  onErrorUpdate = createWidgetEventPublisher(EVENT_TYPES.output.errorUpdate);

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
      const { tableAdd, tableSelect } = EVENT_TYPES.input;
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

    const disableEventHandler = this.getAttribute(ATTRIBUTES.disableEventHandler) === 'true';
    if (!disableEventHandler) {
      const defaultWidgetEventHandler = this.defaultWidgetEventHandler();

      this.unsubscribeFromWidgetEvents = subscribeToWidgetEvents(
        Object.values(EVENT_TYPES.input),
        defaultWidgetEventHandler
      );
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
