import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { apiConferencePost } from 'api/conferences';

import Notification from 'components/common/Notification';
import ConferenceForm from 'components/ConferenceForm';

class ConferenceAddFormContainer extends PureComponent {
  state = {
    notificationMessage: null,
    notificationStatus: Notification.INFO,
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
    const { t, onCreate } = this.props;
    try {
      const createdConference = await apiConferencePost(conference);
      onCreate(createdConference);
      this.setState({
        notificationMessage: t('common.dataSaved'),
        notificationStatus: Notification.SUCCESS,
      });
    } catch (err) {
      this.handleError(err);
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
    const { notificationMessage, notificationStatus } = this.state;
    return (
      <>
        <ConferenceForm onSubmit={this.handleSubmit} />
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
};

ConferenceAddFormContainer.defaultProps = {
  onError: () => {},
  onCreate: () => {},
};

export default withTranslation()(ConferenceAddFormContainer);
