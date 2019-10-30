import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiConferencePost } from 'api/conferences';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';
import 'i18n/__mocks__/i18nMock';
import { mockConferenceWithDateStrings } from 'components/__mocks__/conferenceMocks';

jest.mock('api/conferences');
jest.mock('@material-ui/pickers', () => ({
  ...jest.requireActual('@material-ui/pickers'),
  // eslint-disable-next-line react/prop-types
  DateTimePicker: ({ id, value, name, label, onChange }) => {
    const handleChange = event => onChange(event.currentTarget.value);
    return (
      <span>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={name} value={value || ''} onChange={handleChange} />
      </span>
    );
  },
}));

jest.mock('auth/withAuth', () => Component => props => (
  <Component
    {...props} // eslint-disable-line react/jsx-props-no-spreading
    authenticated
    authInitialized
    authProvider={{}}
    authToken=""
  />
));

describe('ConferenceAddFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'errors.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onCreateMock = jest.fn();

  it('saves data', async () => {
    apiConferencePost.mockImplementation(data => Promise.resolve(data));

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <ConferenceAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />
    );

    const nameField = await findByLabelText('entities.conference.name');
    fireEvent.change(nameField, { target: { value: mockConferenceWithDateStrings.name } });

    const summaryField = await findByLabelText('entities.conference.summary');
    fireEvent.change(summaryField, { target: { value: mockConferenceWithDateStrings.summary } });

    const startField = await findByLabelText('entities.conference.start');
    fireEvent.change(startField, { target: { value: mockConferenceWithDateStrings.start } });

    const endField = await findByLabelText('entities.conference.end');
    fireEvent.change(endField, { target: { value: mockConferenceWithDateStrings.end } });

    rerender(<ConferenceAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiConferencePost).toHaveBeenCalledTimes(1);
      expect(apiConferencePost).toHaveBeenCalledWith(mockConferenceWithDateStrings, '');

      expect(queryByText(successMessageKey)).toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiConferencePost.mockImplementation(() => Promise.reject());

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <ConferenceAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />
    );

    const nameField = await findByLabelText('entities.conference.name');
    fireEvent.change(nameField, { target: { value: mockConferenceWithDateStrings.name } });

    const summaryField = await findByLabelText('entities.conference.summary');
    fireEvent.change(summaryField, { target: { value: mockConferenceWithDateStrings.summary } });

    const startField = await findByLabelText('entities.conference.start');
    fireEvent.change(startField, { target: { value: mockConferenceWithDateStrings.start } });

    const endField = await findByLabelText('entities.conference.end');
    fireEvent.change(endField, { target: { value: mockConferenceWithDateStrings.end } });

    rerender(<ConferenceAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiConferencePost).toHaveBeenCalledTimes(1);
      expect(apiConferencePost).toHaveBeenCalledWith(mockConferenceWithDateStrings, '');

      expect(queryByText(successMessageKey)).not.toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});
