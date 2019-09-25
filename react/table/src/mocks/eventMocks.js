function createData(id, name, summary, start, end) {
  return { id, name, summary, start, end };
}

export const eventsWithDateObjects = [
  createData(
    0,
    'Event name 1',
    'Event summary 1',
    new Date(2019, 3, 5, 19),
    new Date(2019, 3, 5, 23)
  ),
  createData(
    1,
    'Event name 2',
    'Event summary 2',
    new Date(2019, 6, 10, 19),
    new Date(2019, 6, 10, 23)
  ),
  createData(
    2,
    'Event name 3',
    'Event summary 3',
    new Date(2019, 9, 10, 19),
    new Date(2019, 9, 10, 23)
  ),
  createData(
    3,
    'Event name 4',
    'Event summary 4',
    new Date(2019, 11, 15, 19),
    new Date(2019, 11, 12, 23)
  ),
];

export const eventsWithDateStrings = eventsWithDateObjects.map(event => ({
  ...event,
  start: new Date(event.start).toLocaleString(),
  end: new Date(event.start).toLocaleString(),
}));

export const event1 = eventsWithDateStrings[0];
