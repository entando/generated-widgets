import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import EntityAPI from 'api/entity-api';
import ErrorBoundary from 'components/common/error-boundary/ErrorBoundary';
import EntityFieldTable from 'components/entity-field-table/EntityFieldTable';

function transformEntityFields(entity, entityName, t) {
  const translationKeyPrefix = `entities.${entityName}.`;

  return Object.keys(entity).reduce((acc, entityField) => {
    // if the entity field is an object or null - it's a relation to other entity
    const isEntityRelation = typeof entity[entityField] === 'object';

    if (isEntityRelation && entity[entityField] === null) {
      return acc;
    }

    if (isEntityRelation) {
      return [
        ...acc,
        {
          name: entityField,
          label: t(translationKeyPrefix + entityField),
          value: entity[entityField].id,
        },
      ];
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

const Widget = ({ entityName, entityElementId }) => {
  const [loading, setLoading] = useState(true);
  const [entity, setEntity] = useState({});
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    EntityAPI.get(entityName, { id: entityElementId })
      .then(response => response.json())
      .then(response => transformEntityFields(response, entityName, t))
      .then(response => setEntity(response))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, [t, entityName, entityElementId]);

  const renderError = () => <div>{t('common.couldNotFetchData')}</div>;

  const renderLoading = () => t('common.loading');

  return (
    <ErrorBoundary>
      <Box>
        {error && renderError()}
        {!error && loading && renderLoading()}
        {!error && !loading && (
          <>
            <h3 data-testid="widget-name-heading">
              {t('common.widgetName', { widgetNamePlaceholder: entityName })}
            </h3>
            <EntityFieldTable entity={entity} />
          </>
        )}
      </Box>
    </ErrorBoundary>
  );
};

Widget.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityElementId: PropTypes.string,
};

Widget.defaultProps = {
  entityElementId: null,
};

export default Widget;
