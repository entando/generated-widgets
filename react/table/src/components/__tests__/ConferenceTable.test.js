import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import {
  conferenceWithDateString as conference,
  conferencesWithDateStrings as conferences,
} from 'components/__mocks__/conferenceMocks';
import ConferenceTable from 'components/ConferenceTable';

describe('ConferenceTable', () => {
  it('shows items', () => {
    const { getByText } = render(<ConferenceTable items={conferences} />);
    expect(getByText('Conference name 1')).toBeInTheDocument();
    expect(getByText('Conference summary 1')).toBeInTheDocument();
    expect(getByText('Conference name 2')).toBeInTheDocument();
    expect(getByText('Conference summary 2')).toBeInTheDocument();
    expect(getByText('Conference name 3')).toBeInTheDocument();
    expect(getByText('Conference summary 3')).toBeInTheDocument();
    expect(getByText('Conference name 4')).toBeInTheDocument();
    expect(getByText('Conference summary 4')).toBeInTheDocument();
  });

  it('shows no items message', () => {
    const { queryByText } = render(<ConferenceTable items={[]} />);
    expect(queryByText('Conference name 1')).not.toBeInTheDocument();
    expect(queryByText('Conference summary 1')).not.toBeInTheDocument();
    expect(queryByText('Conference name 2')).not.toBeInTheDocument();
    expect(queryByText('Conference summary 2')).not.toBeInTheDocument();
    expect(queryByText('Conference name 3')).not.toBeInTheDocument();
    expect(queryByText('Conference summary 3')).not.toBeInTheDocument();
    expect(queryByText('Conference name 4')).not.toBeInTheDocument();
    expect(queryByText('Conference summary 4')).not.toBeInTheDocument();

    expect(queryByText('conference.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<ConferenceTable items={conferences} onSelect={onSelectMock} />);
    fireEvent.click(getByText('Conference name 1'));
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(conference);
  });
});
