import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { apiConferenceGet, apiConferencePut } from 'api/conferences';

import Notification from 'components/common/Notification';
import ConferenceForm from 'components/ConferenceForm';

class ConferenceEditFormContainer extends PureComponent {
  state = {
    notificationMessage: null,
    notificationStatus: Notification.INFO,
  };

  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchConference();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (id && id !== prevProps.id) {
      this.fetchConference();
    }
  }

  async fetchConference() {
    const { id } = this.props;
    if (!id) return;
    try {
      const conference = await apiConferenceGet(id);
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
    const { t, onUpdate } = this.props;
    try {
      const updatedConference = await apiConferencePut(conference);
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

  handleError(err) {
    const { t, onError } = this.props;
    onError(err);
    this.setState(() => ({
      notificationMessage: t('errors.dataLoading'),
      notificationStatus: Notification.ERROR,
    }));
  }

  render() {
    const { notificationMessage, notificationStatus, conference } = this.state;
    return (
      <>
        <ConferenceForm conference={conference} onSubmit={this.handleSubmit} />
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
};

ConferenceEditFormContainer.defaultProps = {
  onUpdate: () => {},
  onError: () => {},
};

export default withTranslation()(ConferenceEditFormContainer);
