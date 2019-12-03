import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import conferenceMocks from 'components/__mocks__/conferenceMocks';
import ConferenceTable from 'components/ConferenceTable';

describe('ConferenceTable', () => {
  it('shows conferences', () => {
    const { getByText } = render(<ConferenceTable items={conferenceMocks} />);
    expect(
      getByText(
        'Et totam blanditiis. At qui sit omnis qui excepturi sunt suscipit qui ut. Ut magni voluptatum ut est fuga nesciunt. Ratione occaecati iure voluptatem illum qui.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Accusantium labore voluptates rem eos doloribus praesentium. Quaerat ab nihil minima. Magnam facilis odio. Perspiciatis qui enim omnis qui inventore.'
      )
    ).toBeInTheDocument();
  });

  it('shows no conferences message', () => {
    const { queryByText } = render(<ConferenceTable items={[]} />);
    expect(
      queryByText(
        'Et totam blanditiis. At qui sit omnis qui excepturi sunt suscipit qui ut. Ut magni voluptatum ut est fuga nesciunt. Ratione occaecati iure voluptatem illum qui.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Accusantium labore voluptates rem eos doloribus praesentium. Quaerat ab nihil minima. Magnam facilis odio. Perspiciatis qui enim omnis qui inventore.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.conference.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <ConferenceTable items={conferenceMocks} onSelect={onSelectMock} />
    );
    fireEvent.click(
      getByText(
        'Et totam blanditiis. At qui sit omnis qui excepturi sunt suscipit qui ut. Ut magni voluptatum ut est fuga nesciunt. Ratione occaecati iure voluptatem illum qui.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
