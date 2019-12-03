import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string.isRequired,
  summary: PropTypes.string,
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  conferencePrice: PropTypes.number,
  conferenceId: PropTypes.number.isRequired,
  registration: PropTypes.string.isRequired,
  attendeeCount: PropTypes.number.isRequired,
  venueName: PropTypes.string.isRequired,
  venueLat: PropTypes.number.isRequired,
  venueLong: PropTypes.number.isRequired,
  venueId: PropTypes.number.isRequired,
  saleStartDate: PropTypes.string.isRequired,
  earlyBirdActive: PropTypes.bool.isRequired,
  region: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  signature: PropTypes.string,
});

export const formValues = PropTypes.shape({
  name: PropTypes.string,
  summary: PropTypes.string,
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  end: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  conferencePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  conferenceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  registration: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  attendeeCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  venueName: PropTypes.string,
  venueLat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  venueLong: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  venueId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  saleStartDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  earlyBirdActive: PropTypes.bool,
  region: PropTypes.string,
  logo: PropTypes.string,
  content: PropTypes.string,
  signature: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  name: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  summary: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  start: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  end: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  conferencePrice: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  conferenceId: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  registration: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  attendeeCount: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  venueName: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  venueLat: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  venueLong: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  venueId: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  saleStartDate: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  earlyBirdActive: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  region: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  logo: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  content: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  signature: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  summary: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  end: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  conferencePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  conferenceId: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  registration: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  attendeeCount: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  venueName: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  venueLat: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  venueLong: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  venueId: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  saleStartDate: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  earlyBirdActive: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  region: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  signature: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
