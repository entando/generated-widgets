import React from 'react';
import { render } from '@testing-library/react';

import ErrorBoundary from 'components/common/error-boundary/ErrorBoundary';
// import ComponentWithError from 'components/error-boundary/ComponentWithError';

test('renders component without triggering ErrorBoundary', async () => {
  render(
    <>
      <div>Outside boundary content</div>
      <ErrorBoundary>
        <div>No errors</div>
      </ErrorBoundary>
    </>
  );
});

// test('ErrorBoundary catches and contains an error', async () => {
//   const { getByTestId } = render(
//     <>
//       <div>Outside boundary content</div>
//       <ErrorBoundary>
//         <ComponentWithError />
//       </ErrorBoundary>
//     </>,
//   );

//   expect(getByTestId('something-went-wrong-msg'));
// });
