const keycloakConfig = (window && window.KC) || {
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  source: 'env',
};

export default keycloakConfig;
