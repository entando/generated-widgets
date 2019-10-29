import React from 'react';

const KeycloakContext = React.createContext({ keycloak: null });

export const KeycloakContextProvider = KeycloakContext.Provider;
export const KeycloakContextConsumer = KeycloakContext.Consumer;
export default KeycloakContext;
