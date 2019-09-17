import React from 'react';
import PropTypes from 'prop-types';
import eventType from 'eventType';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function EventTable({ rows = [] }) {
  return rows.length ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Summary</TableCell>
          <TableCell>Start</TableCell>
          <TableCell>End</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell>{row.summary}</TableCell>
            <TableCell>{row.start.toLocaleString()}</TableCell>
            <TableCell>{row.end.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    'No events available'
  );
}

EventTable.propTypes = {
  rows: PropTypes.arrayOf(eventType).isRequired,
};
