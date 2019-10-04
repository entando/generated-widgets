import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConferenceForm from 'components/ConferenceForm';
import Notification from 'components/common/Notification';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { postApi } from 'api/conferences';

class ConferenceAddFormContainer extends PureComponent {
  theme = createMuiTheme();

  state = {
    notificationMessage: null,
  };

  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeNotification() {
    this.setState({ notificationMessage: null, notificationVariant: undefined });
  }

  async handleSubmit(conference) {
    const { t } = this.props;
    const createdConference = await postApi({ data: conference });
    const { onCreate } = this.props;
    onCreate(createdConference);

    this.setState({
      conference: createdConference,
      notificationMessage: t('common.dataSaved'),
      notificationVariant: 'success',
    });
  }

  handleError(err) {
    const { onError, t } = this.props;
    onError(err);
    this.setState({
      notificationMessage: t('errors.dataLoading'),
      notificationVariant: 'error',
    });
  }

  render() {
    const { notificationMessage, notificationVariant, conference } = this.state;
    return (
      <ThemeProvider theme={this.theme}>
        <ConferenceForm conference={conference} onSubmit={this.handleSubmit} />
        <Notification
          variant={notificationVariant}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </ThemeProvider>
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
