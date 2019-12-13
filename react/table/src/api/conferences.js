import { DOMAIN } from 'api/constants';
import { getFilterQuery } from 'components/filters/utils';
import { getDefaultOptions, request, getUrl } from 'api/helpers';

const resource = 'conferences';

export const apiConferenceDelete = async id => {
  const url = `${DOMAIN}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'DELETE',
  };
  return request(url, options);
};

export const apiConferencesGet = async ({ filters = [], pagination, mode }) => {
  const filterQuery = getFilterQuery(filters);

  const paginationQuery = pagination
    ? `page=${pagination.page}&size=${pagination.rowsPerPage}`
    : '';

  const url = getUrl(
    `${DOMAIN}/${resource}${mode === 'count' ? '/count' : ''}`,
    filterQuery,
    paginationQuery
  );

  const options = {
    ...getDefaultOptions(),
    method: 'GET',
  };
  return request(url, options);
};
