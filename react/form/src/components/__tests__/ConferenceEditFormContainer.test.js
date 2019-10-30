import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiConferenceGet, apiConferencePut } from 'api/conferences';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import 'i18n/__mocks__/i18nMock';
import { mockConference } from 'components/__mocks__/conferenceMocks';

jest.mock('api/conferences');

jest.mock('auth/withAuth', () => {
  const withAuth = Component => {
    return props => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        authenticated
        authInitialized
        authProvider={{}}
        authToken=""
      />
    );
  };
  return withAuth;
});

describe('ConferenceEditFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'errors.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onUpdateMock = jest.fn();

  it('loads data', async () => {
    apiConferenceGet.mockImplementation(() => Promise.resolve(mockConference));
    const { queryByText } = render(<ConferenceEditFormContainer id="1" onUpdate={onUpdateMock} />);

    await wait(() => {
      expect(apiConferenceGet).toHaveBeenCalledTimes(1);
      expect(apiConferenceGet).toHaveBeenCalledWith('1', '');
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('saves data', async () => {
    apiConferenceGet.mockImplementation(() => Promise.resolve(mockConference));
    apiConferencePut.mockImplementation(() => Promise.resolve(mockConference));

    const { findByTestId, queryByText } = render(
      <ConferenceEditFormContainer id="1" onUpdate={onUpdateMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiConferencePut).toHaveBeenCalledTimes(1);
      expect(apiConferencePut).toHaveBeenCalledWith(mockConference, '');
      expect(queryByText(successMessageKey)).toBeInTheDocument();
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if data is not successfully loaded', async () => {
    apiConferenceGet.mockImplementation(() => Promise.reject());
    const { queryByText } = render(<ConferenceEditFormContainer id="1" onUpdate={onUpdateMock} />);

    await wait(() => {
      expect(apiConferenceGet).toHaveBeenCalledTimes(1);
      expect(apiConferenceGet).toHaveBeenCalledWith('1', '');
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
      expect(queryByText(successMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if data is not successfully saved', async () => {
    apiConferenceGet.mockImplementation(() => Promise.resolve(mockConference));
    apiConferencePut.mockImplementation(() => Promise.reject());
    const { findByTestId, getByText } = render(<ConferenceEditFormContainer id="1" />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiConferenceGet).toHaveBeenCalledTimes(1);
      expect(apiConferenceGet).toHaveBeenCalledWith('1', '');

      expect(apiConferencePut).toHaveBeenCalledTimes(1);
      expect(apiConferencePut).toHaveBeenCalledWith(mockConference, '');

      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});
