const DEFAULT_FILTER_TYPES = ['equals', 'in', 'specified', 'unspecified'];
const STRING_FILTER_TYPES = ['contains'];
const DATE_NUMBER_FILTER_TYPES = [
  { value: 'greaterThan', title: '>' },
  { value: 'lessThan', title: '<' },
  { value: 'greaterOrEqualThan', title: '>=' },
  { value: 'lessOrEqualThan', title: '<=' },
];

const STRING_FIELDS = ['name', 'summary', 'venueName'];
const DATE_FIELDS = ['start', 'end', 'registration', 'saleStartDate'];
const NUMBER_FIELDS = [
  'conferencePrice',
  'conferenceId',
  'attendeeCount',
  'venueLat',
  'venueLong',
  'venueId',
];

export const getFieldFilterTypes = field => {
  return [
    ...DEFAULT_FILTER_TYPES,
    ...(STRING_FIELDS.includes(field) ? STRING_FILTER_TYPES : []),
    ...(DATE_FIELDS.includes(field) ? DATE_NUMBER_FILTER_TYPES : []),
    ...(NUMBER_FIELDS.includes(field) ? DATE_NUMBER_FILTER_TYPES : []),
  ];
};

export const getFilterQuery = (filters = []) => {
  if (filters.length) {
    return filters
      .filter(f => f.field && f.operator)
      .reduce((acc, f) => {
        const key = encodeURIComponent(`${f.field}.${f.operator}`);
        switch (f.operator) {
          case 'specified':
            return [...acc, `${key}=true`];
          case 'unspecified':
            return [...acc, `${key}=false`];
          default:
        }
        return [...acc, `${key}=${encodeURIComponent(f.value)}`];
      }, [])
      .join('&');
  }
  return '';
};
