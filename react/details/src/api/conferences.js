import { DOMAIN, JWT_TOKEN } from 'api/constants';

const getKeycloakToken =
  () => {
    if (
      window && window.entando && window.entando.keycloak &&
      window.entando.keycloak.initialized && window.entando.keycloak.authenticated
    ) {
      return window.entando.keycloak.token;
    } else {
      return '';
    }
  }

export default (params = {}) => {
  const { id, options } = params;

  const token = getKeycloakToken();

  const url = `${DOMAIN}${DOMAIN.endsWith('/') ? '' : '/'}conferences/${id}`;
  const defaultOptions = {
    headers: new Headers({
      Authorization: `Bearer ${JWT_TOKEN || token}`,
      'Content-Type': 'application/json',
    }),
  };

  return fetch(url, {
    method: 'GET',
    ...defaultOptions,
    ...options,
  })
    .then(response =>
      response.status >= 200 && response.status < 300
        ? Promise.resolve(response)
        : Promise.reject(new Error(response.statusText || response.status))
    )
    .then(response => response.json());
};
