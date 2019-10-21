import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';
import setLocale from 'i18n/setLocale';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import retargetEvents from 'react-shadow-dom-retarget-events';
import MountPointContext from 'components/MountPointContext';
import { subscribeToWidgetEvents, publishWidgetEvent } from 'helpers/widgetEvents';

const ATTRIBUTES = {
  id: 'id',
  locale: 'locale',
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
  mountPoint;

  jss;

  removeWidgetEventListeners;

  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
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

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.mountPoint || oldValue === newValue) {
      return;
    }
    const { id, locale } = ATTRIBUTES;
    switch (name) {
      case id: {
        this.render(newValue);
        break;
      }
      case locale: {
        setLocale(newValue);
        break;
      }
      default: {
        throw new Error(`Untracked changed attribute: ${name}`);
      }
    }
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);

    const hidden = this.getAttribute('hidden') === 'true';
    if (hidden) {
      return;
    }

    const id = this.getAttribute(ATTRIBUTES.id);

    const locale = this.getAttribute(ATTRIBUTES.locale);
    setLocale(locale);

    this.jss = create({
      ...jssPreset(),
      insertionPoint: this.mountPoint,
    });

    const overrideEventHandler = this.getAttribute('overrideEventHandler') === 'true';
    if (!overrideEventHandler) {
      const handleWidgetEvent = this.defaultWidgetEventHandler();

      this.removeWidgetEventListeners = subscribeToWidgetEvents(
        Object.values(EVENT_TYPES.input),
        handleWidgetEvent
      );
    }

    this.render(id);

    retargetEvents(shadowRoot);
  }

  disconnectedCallback() {
    if (this.removeWidgetEventListeners) {
      this.removeWidgetEventListeners();
    }
  }

  render(id) {
    const onCreate = payload => publishWidgetEvent(EVENT_TYPES.output.create, payload);
    const onUpdate = payload => publishWidgetEvent(EVENT_TYPES.output.update, payload);
    const onErrorCreate = payload => publishWidgetEvent(EVENT_TYPES.output.errorCreate, payload);
    const onErrorUpdate = payload => publishWidgetEvent(EVENT_TYPES.output.errorUpdate, payload);

    const FormContainer = id
      ? React.createElement(
          ConferenceEditFormContainer,
          { id, onUpdate, onError: onErrorUpdate },
          null
        )
      : React.createElement(ConferenceAddFormContainer, { onCreate, onError: onErrorCreate }, null);

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
