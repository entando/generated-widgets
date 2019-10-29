import React, { Fragment } from 'react';
import WidgetKeycloakProvider from 'auth/keycloak/WidgetKeycloakProvider';
import useKeycloak from 'auth/keycloak/useKeycloak';

const withAuth = WrappedComponent => {
  return class extends React.Component {
    render() {
      const Provider = useKeycloak ? WidgetKeycloakProvider : Fragment;
      return (
        <Provider>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  };
};

export default withAuth;
