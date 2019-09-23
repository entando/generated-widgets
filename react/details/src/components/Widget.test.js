import React from 'react';
import { render } from '@testing-library/react';

import Widget from 'components/Widget';
import MockEntity from 'assets/mock-entity.json';

import 'services/i18n/i18n';

test('renders widget', async () => {
  const { getByTestId } = render(<Widget entity={MockEntity} />);

  expect(getByTestId('widget-name-heading'));
});
