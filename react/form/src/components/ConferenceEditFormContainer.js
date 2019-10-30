import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import withAuth from 'auth/withAuth';
import { apiConferenceGet, apiConferencePut } from 'api/conferences';
import Notification from 'components/common/Notification';
import ConferenceForm from 'components/ConferenceForm';

class ConferenceEditFormContainer extends PureComponent {
  state = {
    notificationMessage: null,
    notificationStatus: null,
  };

  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { authInitialized, authenticated } = this.props;
    const userAuthenticated = authInitialized && authenticated;

    if (userAuthenticated) {
      this.fetchConference();
    }
  }

  componentDidUpdate(prevProps) {
    const { authInitialized, authenticated, id } = this.props;

    const userAuthenticated = authInitialized && authenticated;
    const changedId = id && id !== prevProps.id;
    const changedAuth = prevProps.authInitialized !== authInitialized;

    if (userAuthenticated && (changedId || changedAuth)) {
      this.fetchConference();
    }
  }

  async fetchConference() {
    const { id, authenticated, authToken } = this.props;
    if (!id || !authenticated) return;
    try {
      const conference = await apiConferenceGet(id, authToken);
      this.setState(() => ({
        conference,
      }));
    } catch (err) {
      this.handleError(err);
    }
  }

  closeNotification() {
    this.setState(() => ({ notificationMessage: null }));
  }

  async handleSubmit(conference) {
    const { t, onUpdate, authenticated, authToken } = this.props;
    if (authenticated) {
      try {
        const updatedConference = await apiConferencePut(conference, authToken);
        onUpdate(updatedConference);

        this.setState({
          conference: updatedConference,
          notificationMessage: t('common.dataSaved'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  handleError(err) {
    const { t, onError } = this.props;
    onError(err);
    this.setState(() => ({
      notificationMessage: t('errors.dataLoading'),
      notificationStatus: Notification.ERROR,
    }));
  }

  render() {
    const { authenticated } = this.props;

    const { notificationMessage, notificationStatus, conference } = this.state;
    return (
      <>
        {authenticated && <ConferenceForm conference={conference} onSubmit={this.handleSubmit} />}
        <Notification
          variant={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </>
    );
  }
}

ConferenceEditFormContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onError: PropTypes.func,
  onUpdate: PropTypes.func,
  t: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  authInitialized: PropTypes.bool.isRequired,
  authToken: PropTypes.string,
};

ConferenceEditFormContainer.defaultProps = {
  onUpdate: () => {},
  onError: () => {},
  authToken: null,
  authenticated: false,
};

export default withAuth(withTranslation()(ConferenceEditFormContainer));
