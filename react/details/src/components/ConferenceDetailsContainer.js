import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import withAuth from 'auth/withAuth';
import ConferenceDetails from 'components/ConferenceDetails';
import Notification from 'components/common/Notification';
import getConference from 'api/conferences';

class ConferenceDetailsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      conference: {},
      notificationStatus: Notification.INFO,
      notificationMessage: null,
    };

    this.theme = createMuiTheme();
    this.closeNotification = this.closeNotification.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { authInitialized, authenticated } = this.props;
    const userAuthenticated = authInitialized && authenticated;
    if (userAuthenticated) {
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

  fetchData() {
    const { id, onError, t, authenticated, authToken } = this.props;

    if (id && authenticated) {
      getConference({ id }, authToken)
        .then(conference =>
          this.setState({
            notificationStatus: Notification.INFO,
            notificationMessage: null,
            conference,
          })
        )
        .catch(e => {
          onError(e);
          this.setState({
            notificationStatus: Notification.ERROR,
            notificationMessage: t('common.couldNotFetchData'),
          });
        })
        .finally(() => this.setState({ loading: false }));
    } else {
      this.setState({
        loading: false,
        notificationStatus: Notification.ERROR,
        notificationMessage: t('common.missingId'),
      });
    }
  }

  closeNotification() {
    this.setState({
      notificationStatus: Notification.INFO,
      notificationMessage: null,
    });
  }

  render() {
    const { conference, notificationStatus, notificationMessage, loading } = this.state;
    const { authenticated, t } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        {authenticated && loading && t('common.loading')}
        {!loading && <ConferenceDetails conference={conference} />}
        <Notification
          status={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </ThemeProvider>
    );
  }
}

ConferenceDetailsContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onError: PropTypes.func,
  t: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  authInitialized: PropTypes.bool.isRequired,
  authToken: PropTypes.string,
};

ConferenceDetailsContainer.defaultProps = {
  onError: () => {},
  authToken: null,
  authenticated: false,
};

export default withAuth(withTranslation()(ConferenceDetailsContainer));
