import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WidgetKeycloakProvider from 'auth/keycloak/WidgetKeycloakProvider';
import useKeycloak from 'auth/keycloak/useKeycloak';

const Provider = useKeycloak ? WidgetKeycloakProvider : Fragment;

const AuthProvider = ({ children }) => <Provider>{children}</Provider>;

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AuthProvider;
