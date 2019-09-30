import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import EntityAPI from 'api/entity-api';
import entityApiResponseMockup from 'components/__mocks__/entity-api-response.json';
import WidgetContainer from 'components/WidgetContainer';

jest.mock('api/entity-api');

beforeEach(() => {
  EntityAPI.get.mockClear();
});

describe('Container component', () => {
  test('requests data when component is mounted', async () => {
    EntityAPI.get.mockImplementation(() => Promise.resolve(entityApiResponseMockup));

    render(<WidgetContainer entityName="authors" entityElementId="1" />);

    await wait(() => {
      expect(EntityAPI.get).toHaveBeenCalledTimes(1);
    });
  });

  test('data is shown after mount API call', async () => {
    EntityAPI.get.mockImplementation(() => Promise.resolve(entityApiResponseMockup));

    const { getByText } = render(<WidgetContainer entityName="authors" entityElementId="1" />);

    await wait(() => {
      expect(EntityAPI.get).toHaveBeenCalledTimes(1);
      expect(getByText('entities.authors.id')).toBeInTheDocument();
      expect(getByText('entities.authors.fullname')).toBeInTheDocument();
    });
  });

  test('error is shown after failed API call', async () => {
    const onErrorMock = jest.fn();
    EntityAPI.get.mockImplementation(() => Promise.reject());

    const { getByText } = render(
      <WidgetContainer entityName="authors" entityElementId="1" onError={onErrorMock} />
    );

    await wait(() => {
      expect(EntityAPI.get).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText('common.couldNotFetchData')).toBeInTheDocument();
    });
  });
});
