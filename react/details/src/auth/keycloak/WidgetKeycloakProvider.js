import React from 'react';
import PropTypes from 'prop-types';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';

import keycloakConfig from 'auth/keycloak/keycloakConfig';
// import { KeycloakContextProvider } from 'auth/keycloak/KeycloakContext';

const keycloak = new Keycloak(keycloakConfig);

const keycloakInitConfig = {
  onLoad: 'check-sso',
};

const WidgetKeycloakProvider = ({ children }) => {
  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={keycloakInitConfig}
      onEvent={(event, error) => {
        console.log('onKeycloakEvent', event, error);
      }}
      onTokens={tokens => {
        console.log('onKeycloakTokens', tokens);
      }}
    >
      {/* <KeycloakContextProvider value={ keycloakState }> */}
      {children}
      {/* </KeycloakContextProvider> */}
    </KeycloakProvider>
  );
};

WidgetKeycloakProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default WidgetKeycloakProvider;
