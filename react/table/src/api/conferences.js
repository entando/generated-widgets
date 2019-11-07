/* eslint-disable import/prefer-default-export */
import { DOMAIN, JWT_TOKEN } from 'api/constants';

const getKeycloakToken = () => {
  if (
    window &&
    window.entando &&
    window.entando.keycloak &&
    window.entando.keycloak.initialized &&
    window.entando.keycloak.authenticated
  ) {
    return window.entando.keycloak.token;
  }
  return '';
};

const request = async (url, options) => {
  const response = await fetch(url, options);

  return response.status >= 200 && response.status < 300
    ? response.json()
    : Promise.reject(new Error(response.statusText || response.status));
};

export const apiConferencesGet = async () => {
  const url = `${DOMAIN}/conferences`;

  const token = getKeycloakToken();

  const defaultOptions = {
    headers: new Headers({
      Authorization: `Bearer ${JWT_TOKEN || token}`,
      'Content-Type': 'application/json',
    }),
  };

  const options = {
    ...defaultOptions,
    method: 'GET',
  };
  return request(url, options);
};
