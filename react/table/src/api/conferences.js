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

  const headers = {
    ...(response.headers.has('X-Total-Count')
      ? { 'X-Total-Count': parseInt(response.headers.get('X-Total-Count'), 10) }
      : {}),
  };

  return response.status >= 200 && response.status < 300
    ? { conferences: await response.json(), headers }
    : Promise.reject(new Error(response.statusText || response.status));
};

const getUrl = (url, filters = '', pagination = '') => {
  const hasQuery = !!(filters || pagination);
  const parameters = `${filters}${filters ? '&' : ''}${pagination}`;
  return `${url}${hasQuery ? `?${parameters}` : ''}`;
};

/* eslint-disable-next-line import/prefer-default-export */
export const apiConferencesGet = async ({ filters = [], pagination, mode }) => {
  const filterQuery = getFilterQuery(filters);

  const paginationQuery = pagination
    ? `page=${pagination.page}&size=${pagination.rowsPerPage}`
    : '';

  const url = getUrl(
    `${DOMAIN}/conferences${mode === 'count' ? '/count' : ''}`,
    filterQuery,
    paginationQuery
  );
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
