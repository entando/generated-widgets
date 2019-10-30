import React from 'react';
import PropTypes from 'prop-types';
import { withKeycloak } from 'react-keycloak';

import { getAuthMethod } from 'auth/utils';

const keycloakAuthMethod = getAuthMethod() === 'KEYCLOAK';

const withAuth = WrappedComponent => {
  const AuthenticatedComponent = props => {
    const { keycloakInitialized, keycloak, ...rest } = props;

    // if keycloak is not used, app is initialized and authenticated by default
    const authenticatedProps = {
      ...rest,
      authInitialized: keycloakAuthMethod ? keycloakInitialized : true,
      authProvider: keycloakAuthMethod ? keycloak : {},
      authenticated: keycloakAuthMethod ? keycloak.authenticated : true,
      authToken: keycloakAuthMethod ? keycloak.token : null,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...authenticatedProps} />;
  };

  if (keycloakAuthMethod) {
    AuthenticatedComponent.propTypes = {
      keycloakInitialized: PropTypes.bool.isRequired,
      keycloak: PropTypes.shape({
        authenticated: PropTypes.bool,
        token: PropTypes.string,
      }).isRequired,
    };
    return withKeycloak(AuthenticatedComponent);
  }
  return AuthenticatedComponent;
};

export default withAuth;
