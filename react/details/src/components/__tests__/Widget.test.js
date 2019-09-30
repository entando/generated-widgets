import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import 'components/__mocks__/i18n';
import Widget from 'components/Widget';
import entityDataMockup from 'components/__mocks__/entity-data.json';

describe('Widget component', () => {
  test('renders empty details widget', () => {
    const { getByTestId, container } = render(<Widget entityName="authors" entity={[]} />);

    expect(getByTestId('widget-name-heading'));
    expect(container.querySelector('table > tbody')).toBeEmpty();
  });

  test('renders data in entity details widget', () => {
    const { getByText } = render(<Widget entityName="authors" entity={entityDataMockup} />);

    expect(getByText('Nick OFFERMAN')).toBeInTheDocument();
  });
});
