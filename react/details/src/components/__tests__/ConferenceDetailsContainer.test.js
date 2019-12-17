import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import getConference from 'api/conference';
import conferenceApiGetResponseMock from 'components/__mocks__/conferenceMocks';
import ConferenceDetailsContainer from 'components/ConferenceDetailsContainer';

jest.mock('api/conference');

jest.mock('auth/withKeycloak', () => {
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

  return withKeycloak;
});

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
      expect(getByText('entities.conference.name')).toBeInTheDocument();
      expect(getByText('entities.conference.summary')).toBeInTheDocument();
      expect(getByText('entities.conference.start')).toBeInTheDocument();
      expect(getByText('entities.conference.end')).toBeInTheDocument();
      expect(getByText('entities.conference.conferencePrice')).toBeInTheDocument();
      expect(getByText('entities.conference.conferenceId')).toBeInTheDocument();
      expect(getByText('entities.conference.registration')).toBeInTheDocument();
      expect(getByText('entities.conference.attendeeCount')).toBeInTheDocument();
      expect(getByText('entities.conference.venueName')).toBeInTheDocument();
      expect(getByText('entities.conference.venueLat')).toBeInTheDocument();
      expect(getByText('entities.conference.venueLong')).toBeInTheDocument();
      expect(getByText('entities.conference.venueId')).toBeInTheDocument();
      expect(getByText('entities.conference.saleStartDate')).toBeInTheDocument();
      expect(getByText('entities.conference.earlyBirdActive')).toBeInTheDocument();
      expect(getByText('entities.conference.region')).toBeInTheDocument();
      expect(getByText('entities.conference.logo')).toBeInTheDocument();
      expect(getByText('entities.conference.content')).toBeInTheDocument();
      expect(getByText('entities.conference.signature')).toBeInTheDocument();
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
