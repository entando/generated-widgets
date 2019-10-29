import React from 'react';
import PropTypes from 'prop-types';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';

import keycloakConfig from 'auth/keycloak/keycloakConfig';

const keycloak = new Keycloak(keycloakConfig);

const keycloakInitConfig = {
  onLoad: 'check-sso',
};

const WidgetKeycloakProvider = ({ children }) => {
  return (
    <KeycloakProvider keycloak={keycloak} initConfig={keycloakInitConfig}>
      {children}
    </KeycloakProvider>
  );
};

WidgetKeycloakProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default WidgetKeycloakProvider;
