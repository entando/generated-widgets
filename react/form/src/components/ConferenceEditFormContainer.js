import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConferenceForm from 'components/ConferenceForm';
import Notification from 'components/common/Notification';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { apiConferenceGet, apiConferencePut } from 'api/conferences';
import { createCustomEventDispatcher, listenToCustomEvents } from 'helpers/customEvents';

const inputEvents = ['conference.table.select'];
const outputEventPrefix = 'conference.form.';
const onUpdateError = createCustomEventDispatcher(`${outputEventPrefix}updateError`, 'error');
const onUpdate = createCustomEventDispatcher(`${outputEventPrefix}update`, 'item');

class ConferenceEditFormContainer extends PureComponent {
  theme = createMuiTheme();

  removeCustomEventListeners;

  state = {
    notificationMessage: null,
  };

  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.fetchConference();
    this.addCustomEventListeners();
  }

  componentWillUnmount() {
    if (this.removeCustomEventListeners) {
      this.removeCustomEventListeners();
    }
  }

  addCustomEventListeners() {
    const handleCustomEvent = evt => {
      // TODO use reducer
      console.log('handleCustomEvent');
      this.setState(() => ({
        conference: evt.detail.item,
      }));
    };
    this.removeCustomEventListeners = listenToCustomEvents(inputEvents, handleCustomEvent);
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
    const { t } = this.props;
    try {
      const updatedConference = await apiConferencePut(conference);
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
    const { t } = this.props;
    onUpdateError(err);
    this.setState(() => ({
      notificationMessage: t('errors.dataLoading'),
      notificationStatus: 'error',
    }));
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
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ConferenceEditFormContainer);
