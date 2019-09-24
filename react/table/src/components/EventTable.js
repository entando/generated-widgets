import React from 'react';
import PropTypes from 'prop-types';
import eventType from 'types/eventType';
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

const EventTable = ({ classes, events, onSelect }) => {
  const tableRows = events.map(event => (
    <TableRow hover className={classes.root} key={event.id} onClick={() => onSelect(event)}>
      <TableCell>{event.name}</TableCell>
      <TableCell>{event.summary}</TableCell>
      <TableCell>{event.start}</TableCell>
      <TableCell>{event.end}</TableCell>
    </TableRow>
  ));

  return events.length ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Trans i18nKey="event.tableHeader.name" />
          </TableCell>
          <TableCell>
            <Trans i18nKey="event.tableHeader.summary" />
          </TableCell>
          <TableCell>
            <Trans i18nKey="event.tableHeader.start" />
          </TableCell>
          <TableCell>
            <Trans i18nKey="event.tableHeader.end" />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{tableRows}</TableBody>
    </Table>
  ) : (
    <Trans i18nKey="event.noItems" />
  );
};

EventTable.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  events: PropTypes.arrayOf(eventType).isRequired,
  onSelect: PropTypes.func,
};

EventTable.defaultProps = {
  onSelect: () => {},
};

export default withStyles(styles)(EventTable);
