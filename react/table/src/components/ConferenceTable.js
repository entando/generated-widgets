import React from 'react';
import PropTypes from 'prop-types';
import eventType from 'components/__types__/conferenceType';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Trans } from 'react-i18next';

const styles = {
  root: {
    cursor: 'pointer',
  },
};

const ConferenceTable = ({ classes, items, onSelect }) => {
  const tableRows = items.map(item => (
    <TableRow hover className={classes.root} key={item.id} onClick={() => onSelect(item)}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.summary}</TableCell>
      <TableCell>{item.start}</TableCell>
      <TableCell>{item.end}</TableCell>
    </TableRow>
  ));

  return items.length ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Trans i18nKey="conference.tableHeader.name" />
          </TableCell>
          <TableCell>
            <Trans i18nKey="conference.tableHeader.summary" />
          </TableCell>
          <TableCell>
            <Trans i18nKey="conference.tableHeader.start" />
          </TableCell>
          <TableCell>
            <Trans i18nKey="conference.tableHeader.end" />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{tableRows}</TableBody>
    </Table>
  ) : (
    <Trans i18nKey="conference.noItems" />
  );
};

ConferenceTable.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  items: PropTypes.arrayOf(eventType).isRequired,
  onSelect: PropTypes.func,
};

ConferenceTable.defaultProps = {
  classes: {
    root: '',
  },
  onSelect: () => {},
};

export default withStyles(styles)(ConferenceTable);
