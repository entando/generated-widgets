export const mockConference = {
  name: 'Conference name 1',
  summary: 'Conference summary 1',
  start: new Date(2019, 3, 5, 19),
  end: new Date(2019, 3, 5, 23),
};

export const mockConferenceWithDateStrings = {
  ...mockConference,
  start: new Date(mockConference.start).toLocaleString(),
  end: new Date(mockConference.end).toLocaleString(),
};
