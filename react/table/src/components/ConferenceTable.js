import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import conferenceType from 'components/__types__/conferenceType';

const styles = {
  root: {
    cursor: 'pointer',
  },
};

const ConferenceTable = ({ items, onSelect, classes, t, i18n }) => {
  const tableRows = items.map(item => (
    <TableRow hover className={classes.root} key={item.id} onClick={() => onSelect(item)}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.summary}</TableCell>
      <TableCell>{item.start ? new Date(item.start).toLocaleString(i18n.language) : ''}</TableCell>
      <TableCell>{item.end ? new Date(item.end).toLocaleString(i18n.language) : ''}</TableCell>
    </TableRow>
  ));

  return items.length ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{t('conference.tableHeader.name')}</TableCell>
          <TableCell>{t('conference.tableHeader.summary')}</TableCell>
          <TableCell>{t('conference.tableHeader.start')}</TableCell>
          <TableCell>{t('conference.tableHeader.end')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{tableRows}</TableBody>
    </Table>
  ) : (
    t('conference.noItems')
  );
};

ConferenceTable.propTypes = {
  items: PropTypes.arrayOf(conferenceType).isRequired,
  onSelect: PropTypes.func,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({ language: PropTypes.string.isRequired }).isRequired,
};

ConferenceTable.defaultProps = {
  onSelect: () => {},
};

export default withStyles(styles)(withTranslation()(ConferenceTable));
