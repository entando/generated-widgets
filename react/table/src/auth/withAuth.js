import React, { Fragment } from 'react';
import WidgetKeycloakProvider from 'auth/keycloak/WidgetKeycloakProvider';
import useKeycloak from 'auth/keycloak/useKeycloak';

const withAuth = WrappedComponent => {
  return props => {
    const Provider = useKeycloak ? WidgetKeycloakProvider : Fragment;
    return (
      <Provider>
        <WrappedComponent {...props} /> {/* eslint-disable-line react/jsx-props-no-spreading */}
      </Provider>
    );
  };
};

export default withAuth;
