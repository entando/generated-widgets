import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const EntityFieldValue = ({ value }) => {
  if (typeof value === 'boolean') {
    return <Checkbox checked={value} disabled />;
  }
  return <span>{value}</span>;
};

EntityFieldValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
};

export default EntityFieldValue;
