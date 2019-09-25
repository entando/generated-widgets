import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import 'mocks/i18nMock';
import { eventsWithDateStrings } from 'mocks/eventMocks';
import EventTable from 'components/EventTable';

describe('EventTable', () => {
  it('shows events', () => {
    const { getByText } = render(<EventTable events={eventsWithDateStrings} />);
    expect(getByText('Event name 1')).toBeInTheDocument();
    expect(getByText('Event summary 1')).toBeInTheDocument();
    expect(getByText('Event name 2')).toBeInTheDocument();
    expect(getByText('Event summary 2')).toBeInTheDocument();
    expect(getByText('Event name 3')).toBeInTheDocument();
    expect(getByText('Event summary 3')).toBeInTheDocument();
    expect(getByText('Event name 4')).toBeInTheDocument();
    expect(getByText('Event summary 4')).toBeInTheDocument();
  });

  it('shows no events message', () => {
    const { queryByText } = render(<EventTable events={[]} />);
    expect(queryByText('Event name 1')).not.toBeInTheDocument();
    expect(queryByText('Event summary 1')).not.toBeInTheDocument();
    expect(queryByText('Event name 2')).not.toBeInTheDocument();
    expect(queryByText('Event summary 2')).not.toBeInTheDocument();
    expect(queryByText('Event name 3')).not.toBeInTheDocument();
    expect(queryByText('Event summary 3')).not.toBeInTheDocument();
    expect(queryByText('Event name 4')).not.toBeInTheDocument();
    expect(queryByText('Event summary 4')).not.toBeInTheDocument();

    expect(queryByText('event.noItems')).toBeInTheDocument();
  });
});
