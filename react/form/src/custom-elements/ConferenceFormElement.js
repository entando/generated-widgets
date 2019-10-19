import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';
import setLocale from 'i18n/setLocale';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import retargetEvents from 'react-shadow-dom-retarget-events';
import MountPointContext from 'components/MountPointContext';
import { listenToWidgetEvents, createWidgetEventDispatcher } from 'helpers/widgetEvents';

const EVT_ADD = 'conference.table.add';
const EVT_SELECT = 'conference.table.select';

const ID_ATTR = 'id';
const LOCALE_ATTR = 'locale';

const inputEvents = [EVT_ADD, EVT_SELECT];
const outputEventPrefix = 'conference.form.';

class ConferenceFormElement extends HTMLElement {
  mountPoint;

  jss;

  removeWidgetEventListeners;

  static get observedAttributes() {
    return [ID_ATTR, LOCALE_ATTR];
  }

  addWidgetEventListeners() {
    const handleWidgetEvent = evt => {
      switch (evt.type) {
        case EVT_ADD: {
          this.setAttribute(ID_ATTR, '');
          break;
        }
        case EVT_SELECT: {
          this.setAttribute(ID_ATTR, evt.detail.item.id);
          break;
        }
        default:
          throw new Error('unsupported event for ConferenceFormElement');
      }
    };
    this.removeWidgetEventListeners = listenToWidgetEvents(inputEvents, handleWidgetEvent);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.mountPoint || oldValue === newValue) {
      return;
    }
    switch (name) {
      case ID_ATTR: {
        this.render(newValue);
        break;
      }
      case LOCALE_ATTR: {
        setLocale(newValue);
        break;
      }
      default: {
        throw new Error('Untracked attribute change');
      }
    }
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);

    const id = this.getAttribute(ID_ATTR);

    const locale = this.getAttribute(LOCALE_ATTR);
    setLocale(locale);

    this.jss = create({
      ...jssPreset(),
      insertionPoint: this.mountPoint,
    });

    this.addWidgetEventListeners();

    this.render(id);

    retargetEvents(shadowRoot);
  }

  disconnectedCallback() {
    if (this.removeWidgetEventListeners) {
      this.removeWidgetEventListeners();
    }
  }

  render(id) {
    const onCreateError = createWidgetEventDispatcher(`${outputEventPrefix}createError`, 'error');
    const onUpdateError = createWidgetEventDispatcher(`${outputEventPrefix}updateError`, 'error');
    const onCreate = createWidgetEventDispatcher(`${outputEventPrefix}create`, 'item');
    const onUpdate = createWidgetEventDispatcher(`${outputEventPrefix}update`, 'item');

    const FormContainer = id
      ? React.createElement(
          ConferenceEditFormContainer,
          { id, onUpdate, onError: onUpdateError },
          null
        )
      : React.createElement(ConferenceAddFormContainer, { onCreate, onError: onCreateError }, null);

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

// TODO REMOVE
window.newItem = () => {
  const customEvent = new CustomEvent('conference.table.add');
  window.dispatchEvent(customEvent);
};

window.tableCE = name => {
  const customEvent = new CustomEvent('conference.table.select', {
    detail: {
      item: {
        id: '3',
        name: name || 'pippppo',
        summary: 'summaryyy',
        start: new Date().toLocaleString('en-US'),
        end: new Date().toLocaleString('en-US'),
      },
    },
  });
  window.dispatchEvent(customEvent);
};
