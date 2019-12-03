import React from 'react';
import Box from '@material-ui/core/Box';

import conferenceType from 'components/__types__/conference';
import ConferenceFieldTable from 'components/conference-field-table/ConferenceFieldTable';

const ConferenceDetails = ({ t, conference }) => {
  return (
    <Box>
      <ConferenceFieldTable conference={conference} />
    </Box>
  );
};

ConferenceDetails.propTypes = {
  conference: conferenceType,
};

ConferenceDetails.defaultProps = {
  conference: {},
};

export default ConferenceDetails;
