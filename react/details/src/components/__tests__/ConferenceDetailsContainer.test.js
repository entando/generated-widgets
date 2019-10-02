import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import getConference from 'api/conferenceApi';
import conferenceApiGetResponseMock from 'components/__mocks__/conferenceMocks';
import ConferenceDetailsContainer from 'components/ConferenceDetailsContainer';

jest.mock('api/conferenceApi');

beforeEach(() => {
  getConference.mockClear();
});

describe('ConferenceDetailsContainer component', () => {
  test('requests data when component is mounted', async () => {
    getConference.mockImplementation(() => Promise.resolve(conferenceApiGetResponseMock));

    render(<ConferenceDetailsContainer id="1" />);

    await wait(() => {
      expect(getConference).toHaveBeenCalledTimes(1);
    });
  });

  test('data is shown after mount API call', async () => {
    getConference.mockImplementation(() => Promise.resolve(conferenceApiGetResponseMock));

    const { getByText } = render(<ConferenceDetailsContainer id="1" />);

    await wait(() => {
      expect(getConference).toHaveBeenCalledTimes(1);
      expect(getByText('entities.conference.id')).toBeInTheDocument();
      expect(getByText('entities.conference.name')).toBeInTheDocument();
    });
  });

  test('error is shown after failed API call', async () => {
    const onErrorMock = jest.fn();
    getConference.mockImplementation(() => Promise.reject());

    const { getByText } = render(<ConferenceDetailsContainer id="1" onError={onErrorMock} />);

    await wait(() => {
      expect(getConference).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText('common.couldNotFetchData')).toBeInTheDocument();
    });
  });
});
