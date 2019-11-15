import PropTypes from 'prop-types';

const conferenceType = PropTypes.shape({
  id: PropTypes.number,
  
  name: PropTypes.string,
  summary: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  conferencePrice: PropTypes.string,
  conferenceId: PropTypes.string,
  registration: PropTypes.string,
  attendeeCount: PropTypes.string,
  venueName: PropTypes.string,
  venueLat: PropTypes.string,
  venueLong: PropTypes.string,
  venueId: PropTypes.string,
  saleStartDate: PropTypes.string,
  earlyBirdActive: PropTypes.bool,
  region: PropTypes.string,
  logo: PropTypes.string,
  content: PropTypes.string,
  signature: PropTypes.string,
});

export default conferenceType;
