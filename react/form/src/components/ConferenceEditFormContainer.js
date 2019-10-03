import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConferenceForm from 'components/ConferenceForm';
import ErrorNotification from 'components/common/ErrorNotification';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { getApi, putApi } from 'api/conferences';

class ConferenceEditFormContainer extends PureComponent {
  theme = createMuiTheme();

  state = {
    conference: null,
    error: null,
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
      const conference = await getApi({ id });
      this.setState({
        conference,
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  closeNotification() {
    this.setState({ error: null });
  }

  async handleSubmit(conference) {
    const updatedConference = await putApi({ data: conference });
    const { onUpdate } = this.props;
    onUpdate(updatedConference);
  }

  handleError(err) {
    const { t, onError } = this.props;
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
