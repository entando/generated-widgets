import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';
import setLocale from 'i18n/setLocale';

class ConferenceFormElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);

    const id = this.getAttribute('id');
    const locale = this.getAttribute('locale');

    setLocale(locale);

    const reactRoot = id
      ? React.createElement(ConferenceEditFormContainer, { id }, null)
      : React.createElement(ConferenceAddFormContainer);
    ReactDOM.render(reactRoot, mountPoint);
  }
}

customElements.define('conference-form', ConferenceFormElement);
