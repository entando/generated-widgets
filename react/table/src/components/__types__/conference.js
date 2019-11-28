import PropTypes from 'prop-types';

const conferenceType = PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string,
  summary: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  conferencePrice: PropTypes.number,
  conferenceId: PropTypes.number,
  registration: PropTypes.string,
  attendeeCount: PropTypes.number,
  venueName: PropTypes.string,
  venueLat: PropTypes.number,
  venueLong: PropTypes.number,
  venueId: PropTypes.number,
  saleStartDate: PropTypes.string,
  earlyBirdActive: PropTypes.bool,
  region: PropTypes.string,
  logo: PropTypes.string,
  content: PropTypes.string,
  signature: PropTypes.string,
});

export default conferenceType;
