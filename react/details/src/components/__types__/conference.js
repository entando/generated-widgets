import PropTypes from 'prop-types';

export const fieldType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
});

export const conferenceFieldsType = PropTypes.arrayOf(fieldType);
