import React from 'react';
import PropTypes from 'prop-types';
import { withKeycloak } from 'react-keycloak';

import useKeycloak from 'auth/keycloak/useKeycloak';

const withAuth = WrappedComponent => {
  const AuthenticatedComponent = props => {
    const { keycloakInitialized, keycloak, ...rest } = props;

    // if keycloak is not used, app is initialized and authenticated by default
    const authenticatedProps = {
      ...rest,
      authInitialized: useKeycloak ? keycloakInitialized : true,
      authProvider: useKeycloak ? keycloak : {},
      authenticated: useKeycloak ? keycloak.authenticated : true,
      authToken: useKeycloak ? keycloak.token : null,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...authenticatedProps} />;
  };
  // class AuthenticatedComponent extends React.Component {
  //   render() {
  //     const { keycloakInitialized, keycloak, ...rest } = this.props;

  //     // if keycloak is not used, app is initialized and authenticated by default
  //     const authenticatedProps = {
  //       ...rest,
  //       authInitialized: useKeycloak ? keycloakInitialized : true,
  //       authProvider: useKeycloak ? keycloak : {},
  //       authenticated: useKeycloak ? keycloak.authenticated : true,
  //       authToken: useKeycloak ? keycloak.token : null,
  //     };

  //     return <WrappedComponent {...authenticatedProps} />;
  //   }
  // }

  if (useKeycloak) {
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
