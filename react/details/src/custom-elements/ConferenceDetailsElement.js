import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import ConferenceDetails from 'components/ConferenceDetailsContainer';

class ConferenceDetailsElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);

    const locale = this.getAttribute('locale') || 'en';
    i18next.changeLanguage(locale);

    const customEventPrefix = 'conference.details.'; // lowercase singular

    const onError = error => {
      const customEvent = new CustomEvent(`${customEventPrefix}error`, {
        details: {
          error,
        },
      });
      this.dispatchEvent(customEvent);
    };

    const elementId = this.getAttribute('element-id');

    const reactComponent = React.createElement(ConferenceDetails, {
      elementId,
      onError,
    });
    ReactDOM.render(reactComponent, mountPoint);
  }
}

customElements.define('conference-details', ConferenceDetailsElement);
