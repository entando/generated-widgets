import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import { mockConferenceWithDateStrings } from 'components/__mocks__/conferenceMocks';
import ConferenceForm from 'components/ConferenceForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

describe('Conference Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <ConferenceForm conference={mockConferenceWithDateStrings} />
      </ThemeProvider>
    );

    expect(getByLabelText('entities.conference.name').value).toBe(
      mockConferenceWithDateStrings.name
    );
    expect(getByLabelText('entities.conference.summary').value).toBe(
      mockConferenceWithDateStrings.summary
    );
    expect(getByLabelText('entities.conference.start').value).toBe(
      mockConferenceWithDateStrings.start
    );
    expect(getByLabelText('entities.conference.end').value).toBe(mockConferenceWithDateStrings.end);
  });
});
