import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import { mockConferenceWithDateStrings as mockConference } from 'components/__mocks__/conferenceMocks';
import ConferenceForm from 'components/ConferenceForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

describe('Conference Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <ConferenceForm conference={mockConference} />
      </ThemeProvider>
    );

    expect(getByLabelText('entities.conference.name').value).toBe(mockConference.name);
    expect(getByLabelText('entities.conference.summary').value).toBe(mockConference.summary);
    expect(getByLabelText('entities.conference.start').value).toBe(mockConference.start);
    expect(getByLabelText('entities.conference.end').value).toBe(mockConference.end);
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ConferenceForm conference={mockConference} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('conference-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
