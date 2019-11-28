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
        'Nostrum voluptatem magnam. Aut consequatur omnis expedita earum illo et quidem a nihil. Molestiae rerum ut explicabo deleniti ipsam dolor.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Voluptas voluptate ea fugiat corporis unde labore quod doloremque est. Amet id occaecati. Earum architecto quos nam excepturi sunt non accusamus quo. Vel perferendis itaque omnis error dolorem.'
      )
    ).toBeInTheDocument();
  });

  it('shows no conferences message', () => {
    const { queryByText } = render(<ConferenceTable items={[]} />);
    expect(
      queryByText(
        'Nostrum voluptatem magnam. Aut consequatur omnis expedita earum illo et quidem a nihil. Molestiae rerum ut explicabo deleniti ipsam dolor.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Voluptas voluptate ea fugiat corporis unde labore quod doloremque est. Amet id occaecati. Earum architecto quos nam excepturi sunt non accusamus quo. Vel perferendis itaque omnis error dolorem.'
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
        'Nostrum voluptatem magnam. Aut consequatur omnis expedita earum illo et quidem a nihil. Molestiae rerum ut explicabo deleniti ipsam dolor.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
