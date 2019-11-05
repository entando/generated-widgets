import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import keycloakType from 'components/__types__/keycloak';
import { withKeycloak } from 'auth/KeycloakContext';
import { AuthenticatedView, UnauthenticatedView } from 'auth/KeycloakViews';
import ConferenceTable from 'components/ConferenceTable';
import Notification from 'components/common/Notification';
import { apiConferencesGet } from 'api/conferences';
import { reducer, initialState } from 'state/conference.reducer';
import { ERROR_FETCH, CLEAR_ERRORS, READ_ALL } from 'state/conference.types';

const styles = {
  fab: {
    float: 'right',
  },
};

class ConferenceTableContainer extends Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  state = initialState;

  componentDidMount() {
    const { keycloak } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    const { keycloak } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    const changedAuth = prevProps.keycloak.authenticated !== authenticated;

    if (authenticated && changedAuth) {
      this.fetchData();
    }
  }

  dispatch(action) {
    this.setState(prevState => reducer(prevState, action));
  }

  async fetchData() {
    const { keycloak } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        const conferences = await apiConferencesGet();
        this.dispatch({ type: READ_ALL, payload: conferences });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  closeNotification() {
    this.dispatch({ type: CLEAR_ERRORS });
  }

  handleError(err) {
    const { onError, t } = this.props;
    onError(err);
    this.dispatch({
      type: ERROR_FETCH,
      payload: {
        message: t('conference.error.dataLoading'),
        status: Notification.ERROR,
      },
    });
  }

  render() {
    const { items, errorMessage, errorStatus } = this.state;
    const { classes, onSelect, onAdd, t, keycloak } = this.props;

    return (
      <>
        <UnauthenticatedView keycloak={keycloak}>
          {t('conference.notAuthenticated')}
        </UnauthenticatedView>
        <AuthenticatedView keycloak={keycloak}>
          <Fab color="primary" aria-label="add" className={classes.fab} onClick={onAdd}>
            <AddIcon />
          </Fab>
          <ConferenceTable items={items} onSelect={onSelect} />
        </AuthenticatedView>
        <Notification
          status={errorStatus}
          message={errorMessage}
          onClose={this.closeNotification}
        />
      </>
    );
  }
}

ConferenceTableContainer.propTypes = {
  classes: PropTypes.shape({
    fab: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func,
  onError: PropTypes.func,
  onSelect: PropTypes.func,
  t: PropTypes.func.isRequired,
  keycloak: keycloakType.isRequired,
};

ConferenceTableContainer.defaultProps = {
  onAdd: () => {},
  onError: () => {},
  onSelect: () => {},
};

export default withKeycloak(
  withStyles(styles)(withTranslation(undefined, { withRef: true })(ConferenceTableContainer))
);
