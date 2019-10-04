import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConferenceForm from 'components/ConferenceForm';
import ErrorNotification from 'components/common/ErrorNotification';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { postApi } from 'api/conferences';

class ConferenceAddFormContainer extends PureComponent {
  theme = createMuiTheme();

  state = {
    error: null,
  };

  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeNotification() {
    this.setState({ error: null });
  }

  async handleSubmit(conference) {
    const createdConference = await postApi({ data: conference });
    const { onCreate } = this.props;
    onCreate(createdConference);
  }

  handleError(err) {
    const { onError, t } = this.props;
    onError(err);
    this.setState({
      error: t('errors.dataLoading'),
    });
  }

  render() {
    const { error, conference } = this.state;
    return (
      <ThemeProvider theme={this.theme}>
        <ConferenceForm conference={conference} onSubmit={this.handleSubmit} />
        <ErrorNotification message={error} onClose={this.closeNotification} />
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
