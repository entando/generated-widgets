import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withKeycloak } from 'react-keycloak';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

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
    const { keycloakInitialized, keycloak } = this.props;
    if (keycloakInitialized && keycloak.authenticated) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    const { keycloakInitialized, keycloak } = this.props;
    if (!prevProps.keycloakInitialized && keycloakInitialized && keycloak.authenticated) {
      this.fetchData();
    }
  }

  fetchData() {
    const { id, onError, keycloak, t } = this.props;

    if (id) {
      getConference({ id }, keycloak.token)
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

  closeNotification() {
    this.setState({
      notificationStatus: null,
      notificationMessage: null,
    });
  }

  render() {
    const { conference, notificationStatus, notificationMessage, loading } = this.state;
    const { keycloak, t } = this.props;

    const authenticated = (keycloak && keycloak.authenticated) || false;

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
  keycloak: PropTypes.shape({
    authenticated: PropTypes.bool,
    token: PropTypes.string,
  }).isRequired,
  keycloakInitialized: PropTypes.bool.isRequired,
};

ConferenceDetailsContainer.defaultProps = {
  onError: () => {},
};

export default withKeycloak(withTranslation()(ConferenceDetailsContainer));
