import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import CommonComponent from 'components/common/CommonComponent';

test('renders a message', () => {
  const { container, getByText } = render(<CommonComponent />);
  expect(getByText('Entando React Widget Boilerplate')).toBeInTheDocument();
  expect(container.firstChild).toMatchSnapshot();
});
