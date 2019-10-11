import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { conferencesWithDateObjects as conferences } from 'components/__mocks__/conferenceMocks';
import { apiConferencesGet } from 'api/conferences';
import 'i18n/__mocks__/i18nMock';
import ConferenceTableContainer from 'components/ConferenceTableContainer';

jest.mock('api/conferences');

describe('ConferenceTableContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'conference.error.dataLoading';

  it('calls API', async () => {
    apiConferencesGet.mockImplementation(() => Promise.resolve(conferences));
    const { queryByText } = render(<ConferenceTableContainer />);

    await wait(() => {
      expect(apiConferencesGet).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if the API call is not successful', async () => {
    const onErrorMock = jest.fn();
    apiConferencesGet.mockImplementation(() => Promise.reject());
    const { getByText } = render(<ConferenceTableContainer onError={onErrorMock} />);

    await wait(() => {
      expect(apiConferencesGet).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});
