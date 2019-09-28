import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import Box from '@material-ui/core/Box';

import EntityFieldTable from 'components/entity-field-table/EntityFieldTable';

const Widget = ({ entityName, entity }) => {
  return (
    <Box>
      <h3 data-testid="widget-name-heading">
        {i18next.t('common.widgetName', { widgetNamePlaceholder: entityName })}
      </h3>
      <EntityFieldTable entity={entity} />
    </Box>
  );
};

Widget.propTypes = {
  entityName: PropTypes.string.isRequired,
  entity: PropTypes.arrayOf(PropTypes.shape()),
};

Widget.defaultProps = {
  entity: [],
};

export default Widget;
