import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import useAuthProvider from 'auth/useAuthProvider';
import withAuth from 'auth/withAuth';
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
    const { authInitialized, authenticated } = this.props;
    if (authInitialized && authenticated) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    const { authInitialized, authenticated } = this.props;

    const userAuthenticated = authInitialized && authenticated;
    const changedAuth = prevProps.authInitialized !== authInitialized;

    if (userAuthenticated && changedAuth) {
      this.fetchData();
    }
  }

  dispatch(action) {
    this.setState(prevState => reducer(prevState, action));
  }

  async fetchData() {
    const { authToken, authenticated } = this.props;
    if (authenticated) {
      try {
        const conferences = await apiConferencesGet(authToken);
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
    this.dispatch({ type: ERROR_FETCH, payload: t('conference.error.dataLoading') });
  }

  render() {
    const { items, errorMessage } = this.state;
    const { classes, onSelect, onAdd, authenticated } = this.props;

    return (
      <>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={onAdd}>
          <AddIcon />
        </Fab>
        {authenticated && <ConferenceTable items={items} onSelect={onSelect} />}
        <Notification
          variant={Notification.ERROR}
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
  authenticated: PropTypes.bool,
  authInitialized: PropTypes.bool.isRequired,
  authToken: PropTypes.string,
};

ConferenceTableContainer.defaultProps = {
  onAdd: () => {},
  onError: () => {},
  onSelect: () => {},
  authToken: null,
  authenticated: false,
};

export default useAuthProvider(
  withAuth(
    withStyles(styles)(withTranslation(undefined, { withRef: true })(ConferenceTableContainer))
  )
);
