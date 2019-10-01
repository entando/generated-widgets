import React from 'react';
import i18next from 'i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { conferenceFieldsType } from 'components/__types__/conference';

const ConferenceFieldTable = ({ conference }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{i18next.t('common.name')}</TableCell>
        <TableCell>{i18next.t('common.value')}</TableCell>
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
};

ConferenceFieldTable.defaultProps = {
  conference: [],
};

export default ConferenceFieldTable;
