import { DOMAIN } from 'api/constants';
import { getDefaultOptions, request } from 'api/helpers';

const resource = 'conferences';

export const apiConferenceGet = async id => {
  const url = `${DOMAIN}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'GET',
  };
  return request(url, options);
};

export const apiConferencePost = async conference => {
  const url = `${DOMAIN}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'POST',
    body: conference ? JSON.stringify(conference) : null,
  };
  return request(url, options);
};

export const apiConferencePut = async conference => {
  const url = `${DOMAIN}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'PUT',
    body: conference ? JSON.stringify(conference) : null,
  };
  return request(url, options);
};

export const apiConferenceDelete = async id => {
  const url = `${DOMAIN}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'DELETE',
  };
  return request(url, options);
};
