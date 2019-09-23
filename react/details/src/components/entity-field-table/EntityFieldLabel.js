import React from 'react';
import PropTypes from 'prop-types';

const EntityFieldLabel = ({ label }) => <span>{label}</span>;

EntityFieldLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default EntityFieldLabel;
