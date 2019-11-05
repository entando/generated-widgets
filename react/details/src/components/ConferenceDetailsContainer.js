import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import { withKeycloak, AuthenticatedView, UnauthenticatedView } from 'auth/KeycloakContext';
import ConferenceDetails from 'components/ConferenceDetails';
import Notification from 'components/common/Notification';
import getConference from 'api/conferences';

class ConferenceDetailsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      conference: {},
      notificationStatus: null,
      notificationMessage: null,
    };

    this.theme = createMuiTheme();
    this.closeNotification = this.closeNotification.bind(this);
    this.fetchData = this.fetchData.bind(this);
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

    const changedAuth = prevProps.keycloak.authenticated != authenticated;

    if (authenticated && changedAuth) {
      this.fetchData();
    }
  }

  fetchData() {
    const { id, onError, t, keycloak } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      if (id) {
        getConference({ id })
          .then(conference =>
            this.setState({
              notificationStatus: null,
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
  }

  closeNotification() {
    this.setState({
      notificationStatus: null,
      notificationMessage: null,
    });
  }

  render() {
    const { conference, notificationStatus, notificationMessage, loading } = this.state;
    const { t, keycloak } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        <UnauthenticatedView keycloak={keycloak}>
          {t('common.notAuthenticated')}
        </UnauthenticatedView>
        <AuthenticatedView keycloak={keycloak}>
          {loading && t('common.loading')}
          {!loading && <ConferenceDetails conference={conference} />}
          <Notification
            status={notificationStatus}
            message={notificationMessage}
            onClose={this.closeNotification}
          />
        </AuthenticatedView>
      </ThemeProvider>
    );
  }
}

ConferenceDetailsContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onError: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ConferenceDetailsContainer.defaultProps = {
  onError: () => {},
};

export default withKeycloak(withTranslation()(ConferenceDetailsContainer));
