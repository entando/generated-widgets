import React from 'react';
import { render } from '@testing-library/react';

import ErrorBoundry from 'components/error-boundry/ErrorBoundry';
// import ComponentWithError from 'components/error-boundry/ComponentWithError';

test('renders component without triggering ErrorBoundry', async () => {
  render(
    <>
      <div>Outside boundry content</div>
      <ErrorBoundry>
        <div>No errors</div>
      </ErrorBoundry>
    </>
  );
});

// test('ErrorBoundry catches and contains an error', async () => {
//   const { getByTestId } = render(
//     <>
//       <div>Outside boundry content</div>
//       <ErrorBoundry>
//         <ComponentWithError />
//       </ErrorBoundry>
//     </>,
//   );

//   expect(getByTestId('something-went-wrong-msg'));
// });
