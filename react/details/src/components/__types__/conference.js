import PropTypes from 'prop-types';

const conferenceType = PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string,
  summary: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
});

export default conferenceType;
