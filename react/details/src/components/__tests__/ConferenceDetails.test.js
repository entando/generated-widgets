import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import 'components/__mocks__/i18n';
import ConferenceDetails from 'components/ConferenceDetails';
import { conferenceFields } from 'components/__mocks__/conference-mocks';

describe('ConferenceDetails component', () => {
  test('renders empty details widget', () => {
    const { getByTestId, container } = render(<ConferenceDetails />);

    expect(getByTestId('name-heading'));
    expect(container.querySelector('table > tbody')).toBeEmpty();
  });

  test('renders data in details widget', () => {
    const { getByText } = render(<ConferenceDetails conference={conferenceFields} />);

    expect(getByText('JSConf 2019')).toBeInTheDocument();
  });
});
