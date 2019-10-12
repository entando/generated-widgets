import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceTableContainer from 'components/ConferenceTableContainer';
import setLocale from 'i18n/setLocale';

class ConferenceTableElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);

    const locale = this.getAttribute('locale');
    setLocale(locale);

    const reactRoot = React.createElement(ConferenceTableContainer);
    ReactDOM.render(reactRoot, mountPoint);
  }
}

customElements.define('conference-table', ConferenceTableElement);
