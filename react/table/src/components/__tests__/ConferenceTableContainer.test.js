import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { conferencesWithDateObjects as conferences } from 'components/__mocks__/conferenceMocks';
import { apiConferencesGet } from 'api/conferences';
import 'i18n/__mocks__/i18nMock';
import ConferenceTableContainer from 'components/ConferenceTableContainer';

jest.mock('api/conferences');

jest.mock('auth/withAuth', () => {
  return Component => {
    return props => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
      />
    );
  };
});

jest.mock('react-keycloak', () => {
  return {
    withKeycloak(Component) {
      return props => (
        <Component
          {...props} // eslint-disable-line react/jsx-props-no-spreading
          keycloak={{
            authenticated: true,
            token: null,
          }}
          keycloakInitialized
        />
      );
    },
  };
});

describe('ConferenceTableContainer', () => {
  const errorMessageKey = 'conference.error.dataLoading';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls API', async () => {
    apiConferencesGet.mockImplementation(() => Promise.resolve(conferences));
    const { queryByText } = render(<ConferenceTableContainer />);

    wait(() => {
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
