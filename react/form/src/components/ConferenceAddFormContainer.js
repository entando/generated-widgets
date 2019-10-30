import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import withAuth from 'auth/withAuth';
import { apiConferencePost } from 'api/conferences';
import Notification from 'components/common/Notification';
import ConferenceForm from 'components/ConferenceForm';

class ConferenceAddFormContainer extends PureComponent {
  state = {
    notificationMessage: null,
    notificationStatus: null,
  };

  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeNotification() {
    this.setState({ notificationMessage: null });
  }

  async handleSubmit(conference) {
    const { t, onCreate, authenticated, authToken } = this.props;
    if (authenticated) {
      try {
        const createdConference = await apiConferencePost(conference, authToken);
        onCreate(createdConference);
        this.setState({
          notificationMessage: t('common.dataSaved'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  handleError(err) {
    const { onError, t } = this.props;
    onError(err);
    this.setState({
      notificationMessage: t('errors.dataLoading'),
      notificationStatus: Notification.ERROR,
    });
  }

  render() {
    const { authenticated } = this.props;
    const { notificationMessage, notificationStatus } = this.state;
    return (
      <>
        {authenticated && <ConferenceForm onSubmit={this.handleSubmit} />}
        <Notification
          variant={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </>
    );
  }
}

ConferenceAddFormContainer.propTypes = {
  onError: PropTypes.func,
  onCreate: PropTypes.func,
  t: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  authToken: PropTypes.string,
};

ConferenceAddFormContainer.defaultProps = {
  onError: () => {},
  onCreate: () => {},
  authenticated: false,
  authToken: null,
};

export default withAuth(withTranslation()(ConferenceAddFormContainer));
