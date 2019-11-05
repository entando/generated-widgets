import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';

import ConferenceDetailsContainer from 'components/ConferenceDetailsContainer';
import { KeycloakContext } from 'auth/KeycloakContext';

const KEYCLOAK_EVENT = 'keycloak';

const getKeycloakInstance =
  () =>
    (window && window.entando && window.entando.keycloak && { ...window.entando.keycloak, initialized: true }) ||
    { initialized: false };

class ConferenceDetailsElement extends HTMLElement {
  constructor(...args) {
    super(...args);

    this.mountPoint = null;
    this.keycloak = getKeycloakInstance();
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);

    const locale = this.getAttribute('locale') || 'en';
    i18next.changeLanguage(locale);

    window.addEventListener(KEYCLOAK_EVENT, ({ detail: { eventType } }) => {
      this.keycloak = { ...getKeycloakInstance(), initialized: true };
      this.render();
    });

    this.render();
  }

  render() {
    const customEventPrefix = 'conference.details.';

    const onError = error => {
      const customEvent = new CustomEvent(`${customEventPrefix}error`, {
        details: {
          error,
        },
      });
      this.dispatchEvent(customEvent);
    };

    const id = this.getAttribute('id');

    const ReactComponent = React.createElement(ConferenceDetailsContainer, {
      id,
      onError,
    });
    ReactDOM.render(
      <KeycloakContext.Provider value={ this.keycloak }>
        {ReactComponent}
      </KeycloakContext.Provider>,
      this.mountPoint
    );
  }

  disconnectedCallback() {
    window.removeEventListener(KEYCLOAK_EVENT);
  }
}

customElements.define('conference-details', ConferenceDetailsElement);
