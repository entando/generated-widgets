import React from 'react';
import PropTypes from 'prop-types';
import eventType from 'eventType';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Trans } from 'react-i18next';

export default function EventTable({ events = [] }) {
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
      <TableBody>
        {events.map(event => (
          <TableRow key={event.name}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.summary}</TableCell>
            <TableCell>{event.start.toLocaleString()}</TableCell>
            <TableCell>{event.end.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Trans i18nKey="event.noItems" />
  );
}

EventTable.propTypes = {
  events: PropTypes.arrayOf(eventType).isRequired,
};
