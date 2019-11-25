import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import keycloakType from 'components/__types__/keycloak';
import { withKeycloak } from 'auth/KeycloakContext';
import { AuthenticatedView, UnauthenticatedView } from 'auth/KeycloakViews';
import PaginationWrapper from 'components/pagination/PaginationWrapper';
import FiltersContainer from 'components/filters/FiltersContainer';
import ConferenceTable from 'components/ConferenceTable';
import Notification from 'components/common/Notification';
import { apiConferencesGet } from 'api/conferences';
import { reducer, initialState } from 'state/conference.reducer';
import { CHANGE_ITEMS_PER_PAGE, CHANGE_PAGE, LOAD_MORE } from 'state/pagination.types';
import { ADD_FILTER, UPDATE_FILTER, DELETE_FILTER, CLEAR_FILTERS } from 'state/filter.types';
import { ERROR_FETCH, CLEAR_ERRORS, READ_ALL } from 'state/conference.types';

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
    this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.loadMore = this.loadMore.bind(this);
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

  dispatch(action, afterSetState = () => {}) {
    this.setState(prevState => reducer(prevState, action), afterSetState);
  }

  async fetchData() {
    const { filters, pagination, items } = this.state;
    const { keycloak, paginationMode } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        const requestParameters = {
          filters,
          ...(paginationMode === '' ? {} : { pagination }),
        };

        const { conferences, headers } = await apiConferencesGet(requestParameters);
        const conferenceCount = (headers && headers['X-Total-Count']) || null;

        this.dispatch({
          type: READ_ALL,
          payload: {
            items: paginationMode === 'infinite-scroll' ? [...items, ...conferences] : conferences,
            count: conferenceCount,
          },
        });
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
    this.dispatch({ type: DELETE_FILTER, payload: { filterId } }, this.fetchData);
  }

  clearFilters() {
    this.dispatch({ type: CLEAR_FILTERS }, this.fetchData);
  }

  changeItemsPerPage({ target: { value } }) {
    this.dispatch({ type: CHANGE_ITEMS_PER_PAGE, payload: value }, this.fetchData);
  }

  changePage(event, page) {
    this.dispatch({ type: CHANGE_PAGE, payload: page }, this.fetchData);
  }

  loadMore() {
    this.dispatch({ type: LOAD_MORE }, this.fetchData);
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
    const { items, errorMessage, errorStatus, filters, pagination } = this.state;
    const { classes, onSelect, onAdd, t, keycloak, paginationMode = '' } = this.props;

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
          <PaginationWrapper
            items={items}
            paginationMode={paginationMode}
            onLoadMore={this.loadMore}
            changeItemsPerPage={this.changeItemsPerPage}
            changePage={this.changePage}
            itemCount={pagination.itemCount}
            pagination={pagination}
          >
            <ConferenceTable items={items} onSelect={onSelect} />
          </PaginationWrapper>
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
  paginationMode: PropTypes.string,
};

ConferenceTableContainer.defaultProps = {
  onAdd: () => {},
  onError: () => {},
  onSelect: () => {},
  paginationMode: '',
};

export default withKeycloak(
  withStyles(styles)(withTranslation(undefined, { withRef: true })(ConferenceTableContainer))
);
