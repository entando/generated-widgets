import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { conferenceFieldsType } from 'components/__types__/conference';

const ConferenceFieldTable = ({ t, conference }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{t('common.name')}</TableCell>
        <TableCell>{t('common.value')}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {conference.map(field => (
        <TableRow key={field.name}>
          <TableCell>
            <span>{field.label}</span>
          </TableCell>
          <TableCell>
            <span>{field.value}</span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

ConferenceFieldTable.propTypes = {
  conference: conferenceFieldsType,
  t: PropTypes.func.isRequired,
};

ConferenceFieldTable.defaultProps = {
  conference: [],
};

export default withTranslation()(ConferenceFieldTable);
