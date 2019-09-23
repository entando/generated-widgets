import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import API from 'services/api';
import ErrorBoundary from 'components/error-boundry/ErrorBoundry';
import EntityFieldTable from 'components/entity-field-table/EntityFieldTable';

function transformEntityFields(entity, entityName, t) {
  const translationKeyPrefix = `entity-${entityName}:`;

  return Object.keys(entity).reduce((acc, entityField) => {
    // if the entity field is an object or null - it's a relation to other entity
    const isEntityRelation = typeof entity[entityField] === 'object';

    // TODO: skipping the entity relation fields for now
    if (isEntityRelation) {
      return acc;
    }

    return [
      ...acc,
      {
        name: entityField,
        label: t(translationKeyPrefix + entityField),
        value: entity[entityField],
      },
    ];
  }, []);
}

const Widget = () => {
  const [loading, setLoading] = useState(true);
  const [entity, setEntity] = useState({});
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    // TODO: get endpoint dynamically
    API.get(`${process.env.REACT_APP_SERVER_ENDPOINT}api/libraries/1`)
      .then(response => response.json())
      .then(response => transformEntityFields(response, 'libraries', t)) // TODO: make this dynamic
      .then(response => setEntity(response))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, [t]);

  const renderError = () => <div>{t('common:couldNotFetchData')}</div>;

  const renderLoading = () => 'Loading...';

  return (
    <ErrorBoundary>
      <Box>
        {error && renderError()}
        {!error && loading && renderLoading()}
        {!error && !loading && (
          <>
            <h3 data-testid="widget-name-heading">
              {/* TODO: Get entity name  */}
              {t('common:widgetName', { widgetNamePlaceholder: 'ENTITY NAME' })}
            </h3>
            <EntityFieldTable entity={entity} />
          </>
        )}
      </Box>
    </ErrorBoundary>
  );
};

export default Widget;
