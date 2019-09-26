import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';

import EntityFieldTable from 'components/entity-field-table/EntityFieldTable';

const Widget = ({ entityName, error, entity }) => {
  const { t } = useTranslation();

  const renderError = () => <div>{t('common.couldNotFetchData')}</div>;

  return (
    <Box>
      {error && renderError()}
      {!error && (
        <>
          <h3 data-testid="widget-name-heading">
            {t('common.widgetName', { widgetNamePlaceholder: entityName })}
          </h3>
          <EntityFieldTable entity={entity} />
        </>
      )}
    </Box>
  );
};

Widget.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityElementId: PropTypes.string,
  onError: PropTypes.func,
};

Widget.defaultProps = {
  entityElementId: null,
  onError: () => {},
};

export default Widget;
