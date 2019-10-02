import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import Box from '@material-ui/core/Box';

import ConferenceFieldTable from 'components/conference-field-table/ConferenceFieldTable';

const ConferenceDetails = ({ conference }) => {
  return (
    <Box>
      <h3 data-testid="name-heading">
        {i18next.t('common.widgetName', {
          widgetNamePlaceholder: i18next.t('entities.conference._name'),
        })}
      </h3>
      <ConferenceFieldTable conference={conference} />
    </Box>
  );
};

ConferenceDetails.propTypes = {
  conference: PropTypes.arrayOf(PropTypes.object),
};

ConferenceDetails.defaultProps = {
  conference: [],
};

export default ConferenceDetails;
