/* eslint-disable import/prefer-default-export */
import { DOMAIN, JWT_TOKEN } from 'api/constants';

const resource = 'conferences';

const request = async (url, options) => {
  const response = await fetch(url, options);

  return response.status >= 200 && response.status < 300
    ? response.json()
    : Promise.reject(new Error(response.statusText || response.status));
};

export const apiConferencesGet = async token => {
  const url = `${DOMAIN}/${resource}`;

  const defaultOptions = {
    headers: new Headers({
      Authorization: `Bearer ${JWT_TOKEN || token}`, // TODO: defaults to JWT, should be token only
      'Content-Type': 'application/json',
    }),
  };

  const options = {
    ...defaultOptions,
    method: 'GET',
  };
  return request(url, options);
};
