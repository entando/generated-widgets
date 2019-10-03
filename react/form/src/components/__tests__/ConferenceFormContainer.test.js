import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { conferenceWithDateObjects } from 'mocks/conferenceMocks';
import conferenceAPIGetById from 'api/conferences';
import 'mocks/i18nMock';
import ConferenceFormContainer from 'components/ConferenceEditFormContainer';

jest.mock('api/conferences');

describe('ConferenceFormContainer', () => {
  const errorMessageKey = 'event.error.dataLoading';

  it('calls API', async () => {
    conferenceAPIGetById.mockImplementation(() => Promise.resolve(conferenceWithDateObjects));
    const { queryByText } = render(<ConferenceFormContainer id="1" />);

    await wait(() => {
      expect(conferenceAPIGetById).toHaveBeenCalledTimes(1);
      expect(conferenceAPIGetById).toHaveBeenCalledWith('1');
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if the API call is not successful', async () => {
    const onErrorMock = jest.fn();
    conferenceAPIGetById.mockImplementation(() => Promise.reject());
    const { getByText } = render(<ConferenceFormContainer onError={onErrorMock} />);

    await wait(() => {
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});
