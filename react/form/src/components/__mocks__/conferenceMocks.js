function createData(id, name, summary, start, end) {
  return { id, name, summary, start, end };
}

export const conferenceWithDateObjects = createData(
  0,
  'Conference name 1',
  'Conference summary 1',
  new Date(2019, 3, 5, 19),
  new Date(2019, 3, 5, 23)
);

export const conferenceWithDateStrings = {
  ...conferenceWithDateObjects,
  start: new Date(conferenceWithDateObjects.start).toLocaleString(),
  end: new Date(conferenceWithDateObjects.end).toLocaleString(),
};
