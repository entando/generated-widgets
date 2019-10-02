import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import ConferenceFieldTable from 'components/conference-field-table/ConferenceFieldTable';

const ConferenceDetails = ({ t, conference }) => {
  return (
    <Box>
      <h3 data-testid="name-heading">
        {t('common.widgetName', {
          widgetNamePlaceholder: t('entities.conference._name'),
        })}
      </h3>
      <ConferenceFieldTable conference={conference} />
    </Box>
  );
};

ConferenceDetails.propTypes = {
  conference: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func.isRequired,
};

ConferenceDetails.defaultProps = {
  conference: [],
};

export default withTranslation()(ConferenceDetails);
