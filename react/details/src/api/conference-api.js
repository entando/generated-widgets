import { DOMAIN, JWT_TOKEN } from 'api/constants';

const generateApi = (endpoint, method) => {
  const defaultOptions = {
    headers: new Headers({
      Authorization: `Bearer ${JWT_TOKEN}`,
      'Content-Type': 'application/json',
    }),
  };

  return (params = {}) => {
    const { options, data, id } = params;

    const domainWithSlash = DOMAIN.endsWith('/') ? DOMAIN : `${DOMAIN}/`;

    const url = `${domainWithSlash}${endpoint}${id ? `/${id}` : ''}`;

    return fetch(url, {
      method,
      ...defaultOptions,
      ...options,
      ...(data ? { body: JSON.stringify(data) } : {}),
    })
      .then(response =>
        response.status >= 200 && response.status < 300
          ? Promise.resolve(response)
          : Promise.reject(new Error(response.statusText || response.status))
      )
      .then(response => response.json());
  };
};

export const getApi = generateApi('conferences', 'GET');
export const postApi = generateApi('conferences', 'POST');
export const putApi = generateApi('conferences', 'PUT');
export const deleteApi = generateApi('conferences', 'DELETE');

const API = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
};

export default API;
