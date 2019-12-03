import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import conferenceMocks from 'components/__mocks__/conferenceMocks';
import { apiConferencesGet } from 'api/conferences';
import 'i18n/__mocks__/i18nMock';
import ConferenceTableContainer from 'components/ConferenceTableContainer';

jest.mock('api/conferences');

jest.mock('auth/KeycloakContext', () => {
  const withKeycloak = Component => {
    return props => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        keycloak={{
          initialized: true,
          authenticated: true,
        }}
      />
    );
  };

  return { withKeycloak };
});

describe('ConferenceTableContainer', () => {
  const errorMessageKey = 'error.dataLoading';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls API', async () => {
    apiConferencesGet.mockImplementation(() =>
      Promise.resolve({ conferences: conferenceMocks, count: 2 })
    );
    const { queryByText } = render(<ConferenceTableContainer />);

    await wait(() => {
      expect(apiConferencesGet).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if the API call is not successful', async () => {
    apiConferencesGet.mockImplementation(() => {
      throw new Error();
    });
    const { getByText } = render(<ConferenceTableContainer />);

    wait(() => {
      expect(apiConferencesGet).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});
