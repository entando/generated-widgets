import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import ConferenceAPI from 'api/conference-api';
import conferenceApiResponseMockup from 'components/__mocks__/conference-get-api-response.json';
import ConferenceDetailsContainer from 'components/ConferenceDetailsContainer';

jest.mock('api/conference-api');

beforeEach(() => {
  ConferenceAPI.get.mockClear();
});

describe('ConferenceDetailsContainer component', () => {
  test('requests data when component is mounted', async () => {
    ConferenceAPI.get.mockImplementation(() => Promise.resolve(conferenceApiResponseMockup));

    render(<ConferenceDetailsContainer elementId="1" />);

    await wait(() => {
      expect(ConferenceAPI.get).toHaveBeenCalledTimes(1);
    });
  });

  test('data is shown after mount API call', async () => {
    ConferenceAPI.get.mockImplementation(() => Promise.resolve(conferenceApiResponseMockup));

    const { getByText } = render(<ConferenceDetailsContainer elementId="1" />);

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
      <ConferenceDetailsContainer elementId="1" onError={onErrorMock} />
    );

    await wait(() => {
      expect(ConferenceAPI.get).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText('common.couldNotFetchData')).toBeInTheDocument();
    });
  });
});
