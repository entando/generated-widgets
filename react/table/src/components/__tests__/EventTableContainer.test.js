import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { eventsWithDateObjects } from 'mocks/eventMocks';
import eventsGet from 'api/events';
import 'mocks/i18nMock';
import EventTableContainer from 'components/EventTableContainer';

jest.mock('api/events');

describe('EventTableContainer', () => {
  const errorMessageKey = 'event.error.dataLoading';

  it('calls API', async () => {
    eventsGet.mockImplementation(() => Promise.resolve(eventsWithDateObjects));
    const { queryByText } = render(<EventTableContainer />);

    await wait(() => {
      expect(eventsGet).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if the API call is not successful', async () => {
    const onErrorMock = jest.fn();
    eventsGet.mockImplementation(() => Promise.reject());
    const { getByText } = render(<EventTableContainer onError={onErrorMock} />);

    await wait(() => {
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});
