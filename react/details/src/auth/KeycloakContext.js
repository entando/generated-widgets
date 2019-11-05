import React from 'react';

export const KeycloakContext = React.createContext(null);

export function withKeycloak(WrappedComponent) {
  return function ComponentWithKeycloak(props) {
    return (
      <KeycloakContext.Consumer>
        {value => <WrappedComponent {...props} keycloak={value} />}
      </KeycloakContext.Consumer>
    );
  };
}
  
export const AuthenticatedView = ({children, keycloak}) => {
  const authenticated = keycloak.initialized && keycloak.authenticated;
  return (authenticated) ? children : null;
};

export const UnauthenticatedView = ({children, keycloak}) => {
  const authenticated = keycloak.initialized && keycloak.authenticated;
  return (!authenticated) ? children : null;
};
