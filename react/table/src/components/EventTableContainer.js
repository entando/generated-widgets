import React from 'react';
import EventTable from 'components/EventTable';

function createData(name, summary, start, end) {
  return { name, summary, start, end };
}

export default function EventTableContainer() {
  // TODO call backend api

  const rows = [
    createData(
      'Spring Company Meeting',
      'Spring Company Meeting',
      new Date(2019, 3, 5, 19),
      new Date(2019, 3, 5, 23)
    ),
    createData(
      'Summer Company Meeting',
      'Summer Company Meeting',
      new Date(2019, 6, 10, 19),
      new Date(2019, 6, 10, 23)
    ),
    createData(
      'Autumn Company Meeting',
      'Autumn Company Meeting',
      new Date(2019, 9, 10, 19),
      new Date(2019, 9, 10, 23)
    ),
    createData(
      'Winter Company Meeting',
      'Winter Company Meeting',
      new Date(2019, 11, 15, 19),
      new Date(2019, 11, 12, 23)
    ),
  ];

  return <EventTable rows={rows} />;
}
