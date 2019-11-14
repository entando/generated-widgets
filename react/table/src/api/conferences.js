/* eslint-disable import/prefer-default-export */
import { DOMAIN } from 'api/constants';
import { getFilterQuery } from 'components/filters/utils';

const getKeycloakToken = () => {
  if (
    window &&
    window.entando &&
    window.entando.keycloak &&
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

export const apiConferencesGet = async ({ filters = [] }) => {
  const query = getFilterQuery(filters);

  const url = `${DOMAIN}/conferences${query ? `?${query}` : ''}`;

  const token = getKeycloakToken();

  const defaultOptions = {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  };

  const options = {
    ...defaultOptions,
    method: 'GET',
  };
  return request(url, options);
};
