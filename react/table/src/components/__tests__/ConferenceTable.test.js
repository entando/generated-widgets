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
        'Delectus maxime excepturi et quia quasi quos et iure. Quos et eum est illo illum. A nostrum quasi ex voluptatibus accusantium non. Unde omnis quo ut quaerat nobis quaerat molestiae. Veritatis dolores et.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Quibusdam qui sint ut beatae cupiditate aliquam officiis autem. Aperiam unde non soluta tempore eius sit maxime. Ducimus ut consequatur quam vel aperiam a sit facere. Aut atque dolor.'
      )
    ).toBeInTheDocument();
  });

  it('shows no conferences message', () => {
    const { queryByText } = render(<ConferenceTable items={[]} />);
    expect(
      queryByText(
        'Delectus maxime excepturi et quia quasi quos et iure. Quos et eum est illo illum. A nostrum quasi ex voluptatibus accusantium non. Unde omnis quo ut quaerat nobis quaerat molestiae. Veritatis dolores et.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Quibusdam qui sint ut beatae cupiditate aliquam officiis autem. Aperiam unde non soluta tempore eius sit maxime. Ducimus ut consequatur quam vel aperiam a sit facere. Aut atque dolor.'
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
        'Delectus maxime excepturi et quia quasi quos et iure. Quos et eum est illo illum. A nostrum quasi ex voluptatibus accusantium non. Unde omnis quo ut quaerat nobis quaerat molestiae. Veritatis dolores et.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
