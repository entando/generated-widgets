import React from 'react';
import { render } from '@testing-library/react';

import Widget from 'components/Widget';

import 'i18n/i18n';

test('renders widget', async () => {
  const { getByTestId } = render(<Widget />);

  expect(getByTestId('widget-name-heading'));
});
