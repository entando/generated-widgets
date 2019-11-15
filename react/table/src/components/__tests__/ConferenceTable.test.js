import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import conferenceMocks from 'components/__mocks__/conferenceMocks';
import ConferenceTable from 'components/ConferenceTable';

describe('ConferenceTable', () => {
  it('shows conferences', () => {
    const { getByText } = render(<ConferenceTable items={conferenceMocks} />);
    expect(getByText('Numquam quo illo aut quia labore hic. Pariatur hic et sint beatae sapiente. Non aut sequi modi. Eum ea pariatur ut ut aspernatur.')).toBeInTheDocument();
    expect(getByText('Quia natus rerum eveniet accusantium nobis velit ut. Et iure veritatis corporis est sed ut odit ipsum. Fuga qui officia beatae voluptatum vitae aut assumenda. Eum dolores voluptatem eaque. Rerum sed voluptatum similique eos et facilis voluptatem ullam. Voluptate sint adipisci in consectetur occaecati earum eligendi in.')).toBeInTheDocument();
  });

  it('shows no conferences message', () => {
    const { queryByText } = render(<ConferenceTable items={[]} />);
    expect(queryByText('Numquam quo illo aut quia labore hic. Pariatur hic et sint beatae sapiente. Non aut sequi modi. Eum ea pariatur ut ut aspernatur.')).not.toBeInTheDocument();
    expect(queryByText('Quia natus rerum eveniet accusantium nobis velit ut. Et iure veritatis corporis est sed ut odit ipsum. Fuga qui officia beatae voluptatum vitae aut assumenda. Eum dolores voluptatem eaque. Rerum sed voluptatum similique eos et facilis voluptatem ullam. Voluptate sint adipisci in consectetur occaecati earum eligendi in.')).not.toBeInTheDocument();

    expect(queryByText('entities.conference.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <ConferenceTable items={conferenceMocks} onSelect={onSelectMock} />
    );
    fireEvent.click(getByText('Numquam quo illo aut quia labore hic. Pariatur hic et sint beatae sapiente. Non aut sequi modi. Eum ea pariatur ut ut aspernatur.'));
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
