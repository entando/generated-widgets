import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import keycloakType from 'components/__types__/keycloak';
import { withKeycloak } from 'auth/KeycloakContext';
import { AuthenticatedView, UnauthenticatedView } from 'auth/KeycloakViews';
import FiltersContainer from 'components/filters/FiltersContainer';
import ConferenceTable from 'components/ConferenceTable';
import Notification from 'components/common/Notification';
import { apiConferencesGet } from 'api/conferences';
import { reducer, initialState } from 'state/conference.reducer';
import {
  ERROR_FETCH,
  CLEAR_ERRORS,
  READ_ALL,
  ADD_FILTER,
  UPDATE_FILTER,
  DELETE_FILTER,
  CLEAR_FILTERS,
} from 'state/conference.types';

const styles = {
  fab: {
    float: 'right',
  },
};

class ConferenceTableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleError = this.handleError.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

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
    const { filters } = this.state;
    const { keycloak } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        const conferences = await apiConferencesGet({ filters });

        this.dispatch({ type: READ_ALL, payload: conferences });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  updateFilter(filterId, values) {
    this.dispatch({ type: UPDATE_FILTER, payload: { values, filterId } });
  }

  addFilter() {
    this.dispatch({ type: ADD_FILTER });
  }

  removeFilter(filterId) {
    this.dispatch({ type: DELETE_FILTER, payload: { filterId } });
  }

  clearFilters() {
    this.dispatch({ type: CLEAR_FILTERS });
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
    const { items, errorMessage, errorStatus, filters } = this.state;
    const { classes, onSelect, onAdd, t, keycloak } = this.props;

    return (
      <>
        <UnauthenticatedView keycloak={keycloak}>
          {t('common.notAuthenticated')}
        </UnauthenticatedView>
        <AuthenticatedView keycloak={keycloak}>
          <Fab color="primary" aria-label="add" className={classes.fab} onClick={onAdd}>
            <AddIcon />
          </Fab>
          <FiltersContainer
            applyFilter={this.fetchData}
            add={this.addFilter}
            update={this.updateFilter}
            remove={this.removeFilter}
            clear={this.clearFilters}
            filters={filters}
          />
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
