import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import conferenceType from 'components/__types__/conference';
import ConferenceFieldTable from 'components/conference-field-table/ConferenceFieldTable';

const ConferenceDetails = ({ conference, hideEditButton, onEdit, t }) => {
  return (
    <Box>
      {!hideEditButton && (
        <Button color="primary" onClick={onEdit}>
          {t('common.edit')}
        </Button>
      )}
      <ConferenceFieldTable conference={conference} />
    </Box>
  );
};

ConferenceDetails.propTypes = {
  onEdit: PropTypes.func.isRequired,
  hideEditButton: PropTypes.bool.isRequired,
  conference: conferenceType,
  t: PropTypes.func.isRequired,
};

ConferenceDetails.defaultProps = {
  conference: {},
};

export default withTranslation()(ConferenceDetails);
