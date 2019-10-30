import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';

import { getAuthMethod } from 'auth/utils';
import WidgetKeycloakProvider from 'auth/keycloak/WidgetKeycloakProvider';
import ConferenceDetailsContainer from 'components/ConferenceDetailsContainer';

class ConferenceDetailsElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);

    const locale = this.getAttribute('locale') || 'en';
    i18next.changeLanguage(locale);

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

    const AuthProvider = getAuthMethod() === 'KEYCLOAK' ? WidgetKeycloakProvider : Fragment;

    const ReactComponent = React.createElement(ConferenceDetailsContainer, {
      id,
      onError,
    });
    ReactDOM.render(<AuthProvider>{ReactComponent}</AuthProvider>, mountPoint);
  }
}

customElements.define('conference-details', ConferenceDetailsElement);
