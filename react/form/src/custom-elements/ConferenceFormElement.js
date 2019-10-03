import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';
import customEventDispatcher from 'custom-elements/customEventDispatcher';

class ConferenceFormElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);

    const id = this.getAttribute('id');
    const locale = this.getAttribute('locale') || 'en';
    i18next.changeLanguage(locale);

    const prefix = 'conference.form.';

    const onCreateError = customEventDispatcher(`${prefix}createError`, 'error');
    const onUpdateError = customEventDispatcher(`${prefix}updateError`, 'error');
    const onCreate = customEventDispatcher(`${prefix}create`, 'item');
    const onUpdate = customEventDispatcher(`${prefix}update`, 'item');

    const reactRoot = id
      ? React.createElement(
          ConferenceEditFormContainer,
          { id, onError: onUpdateError, onUpdate },
          null
        )
      : React.createElement(ConferenceAddFormContainer, { onError: onCreateError, onCreate }, null);
    ReactDOM.render(reactRoot, mountPoint);
  }
}

customElements.define('conference-form', ConferenceFormElement);
