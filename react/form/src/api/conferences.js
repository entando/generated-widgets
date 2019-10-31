import { DOMAIN, JWT_TOKEN } from 'api/constants';

const resource = 'conferences';

const getDefaultOptions = token => ({
  headers: new Headers({
    Authorization: `Bearer ${JWT_TOKEN || token}`,
    'Content-Type': 'application/json',
  }),
});

const request = async (url, options) => {
  const response = await fetch(url, options);

  return response.status >= 200 && response.status < 300
    ? response.json()
    : Promise.reject(new Error(response.statusText || response.status));
};

export const apiConferenceGet = async (id, token) => {
  const url = `${DOMAIN}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(token),
    method: 'GET',
  };

  return request(url, options);
};

export const apiConferencePost = async (conference, token) => {
  const url = `${DOMAIN}/${resource}`;
  const options = {
    ...getDefaultOptions(token),
    method: 'POST',
    body: conference ? JSON.stringify(conference) : null,
  };

  return request(url, options);
};

export const apiConferencePut = async (conference, token) => {
  const url = `${DOMAIN}/${resource}`;
  const options = {
    ...getDefaultOptions(token),
    method: 'PUT',
    body: conference ? JSON.stringify(conference) : null,
  };
  return request(url, options);
};
