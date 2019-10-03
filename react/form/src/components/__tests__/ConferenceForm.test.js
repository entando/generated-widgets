import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import 'mocks/i18nMock';
import { conferenceWithDateStrings } from 'mocks/conferenceMocks';
import ConferenceForm from 'components/ConferenceForm';

describe('Conference Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(<ConferenceForm conference={conferenceWithDateStrings} />);
    expect(getByLabelText('conference.form.name').value).toBe('Conference name 1');
    expect(getByLabelText('conference.form.summary').value).toBe('Conference name 1');
    expect(getByLabelText('conference.form.start').value).toBe('5/3/2019 19.00');
    expect(getByLabelText('conference.form.end').value).toBe('5/3/2019 23.00');
  });
});
