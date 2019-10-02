import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import ConferenceAPI from 'api/conferenceApi';
import conferenceApiGetResponseMock from 'components/__mocks__/conferenceMocks';
import ConferenceDetailsContainer from 'components/ConferenceDetailsContainer';

jest.mock('api/conferenceApi');

beforeEach(() => {
  ConferenceAPI.get.mockClear();
});

describe('ConferenceDetailsContainer component', () => {
  test('requests data when component is mounted', async () => {
    ConferenceAPI.get.mockImplementation(() => Promise.resolve(conferenceApiGetResponseMock));

    render(<ConferenceDetailsContainer conferenceId="1" />);

    await wait(() => {
      expect(ConferenceAPI.get).toHaveBeenCalledTimes(1);
    });
  });

  test('data is shown after mount API call', async () => {
    ConferenceAPI.get.mockImplementation(() => Promise.resolve(conferenceApiGetResponseMock));

    const { getByText } = render(<ConferenceDetailsContainer conferenceId="1" />);

    await wait(() => {
      expect(ConferenceAPI.get).toHaveBeenCalledTimes(1);
      expect(getByText('entities.conference.id')).toBeInTheDocument();
      expect(getByText('entities.conference.name')).toBeInTheDocument();
    });
  });

  test('error is shown after failed API call', async () => {
    const onErrorMock = jest.fn();
    ConferenceAPI.get.mockImplementation(() => Promise.reject());

    const { getByText } = render(
      <ConferenceDetailsContainer conferenceId="1" onError={onErrorMock} />
    );

    await wait(() => {
      expect(ConferenceAPI.get).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText('common.couldNotFetchData')).toBeInTheDocument();
    });
  });
});
