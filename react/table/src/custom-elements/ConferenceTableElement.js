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

    const customEventPrefix = 'conference.table.';

    const onError = error => {
      const customEvent = new CustomEvent(`${customEventPrefix}error`, {
        detail: {
          error,
        },
      });
      this.dispatchEvent(customEvent);
    };

    const onSelect = item => {
      const customEvent = new CustomEvent(`${customEventPrefix}select`, {
        detail: {
          item,
        },
      });
      this.dispatchEvent(customEvent);
    };

    const reactRoot = React.createElement(ConferenceTableContainer, { onError, onSelect }, null);
    ReactDOM.render(reactRoot, mountPoint);
  }
}

customElements.define('conference-table', ConferenceTableElement);
