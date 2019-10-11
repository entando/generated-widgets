function createData(id, name, summary, start, end) {
  return { id, name, summary, start, end };
}

export const conferencesWithDateObjects = [
  createData(
    0,
    'Conference name 1',
    'Conference summary 1',
    new Date(2019, 3, 5, 19),
    new Date(2019, 3, 5, 23)
  ),
  createData(
    1,
    'Conference name 2',
    'Conference summary 2',
    new Date(2019, 6, 10, 19),
    new Date(2019, 6, 10, 23)
  ),
  createData(
    2,
    'Conference name 3',
    'Conference summary 3',
    new Date(2019, 9, 10, 19),
    new Date(2019, 9, 10, 23)
  ),
  createData(
    3,
    'Conference name 4',
    'Conference summary 4',
    new Date(2019, 11, 15, 19),
    new Date(2019, 11, 12, 23)
  ),
];

export const conferencesWithDateStrings = conferencesWithDateObjects.map(item => ({
  ...item,
  start: new Date(item.start).toLocaleString(),
  end: new Date(item.start).toLocaleString(),
}));

export const conferenceWithDateString = conferencesWithDateStrings[0];
