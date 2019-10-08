import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConferenceForm from 'components/ConferenceForm';
import Notification from 'components/common/Notification';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { apiConferenceGet, apiConferencePut } from 'api/conferences';

class ConferenceEditFormContainer extends PureComponent {
  theme = createMuiTheme();

  state = {
    conference: null,
    notificationMessage: null,
  };

  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    if (!id) return;
    try {
      const conference = await apiConferenceGet(id);
      this.setState({
        conference,
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  closeNotification() {
    this.setState({ notificationMessage: null, notificationStatus: null });
  }

  async handleSubmit(conference) {
    const { t } = this.props;
    try {
      const updatedConference = await apiConferencePut(conference);
      const { onUpdate } = this.props;
      onUpdate(updatedConference);

      this.setState({
        conference: updatedConference,
        notificationMessage: t('common.dataSaved'),
        notificationStatus: 'success',
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(err) {
    const { t, onError } = this.props;
    onError(err);
    this.setState({
      notificationMessage: t('errors.dataLoading'),
      notificationStatus: 'error',
    });
  }

  render() {
    const { notificationMessage, notificationStatus, conference } = this.state;
    return (
      <ThemeProvider theme={this.theme}>
        <ConferenceForm conference={conference} onSubmit={this.handleSubmit} />
        <Notification
          variant={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </ThemeProvider>
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
  onError: () => {},
  onUpdate: () => {},
};

export default withTranslation()(ConferenceEditFormContainer);
