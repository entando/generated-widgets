import { DOMAIN, JWT_TOKEN } from 'api/constants';

export default (params = {}, token) => {
  const { id, options } = params;

  const url = `${DOMAIN}${DOMAIN.endsWith('/') ? '' : '/'}conferences/${id}`;
  const defaultOptions = {
    headers: new Headers({
      Authorization: `Bearer ${JWT_TOKEN || token}`, // TODO: defaults to JWT, should be token only
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
