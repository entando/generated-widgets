import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import ConferenceDetails from 'components/ConferenceDetails';
import ErrorNotification from 'components/common/ErrorNotification';
import ConferenceAPI from 'api/conferenceApi';

class ConferenceDetailsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      conference: {},
      error: null,
    };

    this.theme = createMuiTheme();
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    const { t, id, onError } = this.props;

    if (id) {
      ConferenceAPI.get({ id })
        .then(response => this.setState({ error: null, conference: response }))
        .catch(e => {
          onError(e);
          this.setState({ error: t('common.couldNotFetchData') });
        })
        .finally(() => this.setState({ loading: false }));
    } else {
      this.setState({ loading: false, error: t('common.missingId') });
    }
  }

  closeNotification() {
    this.setState({ error: null });
  }

  render() {
    const { conference, error, loading } = this.state;
    const { t } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        {loading && t('common.loading')}
        {!loading && <ConferenceDetails conference={conference} />}
        <ErrorNotification message={error} onClose={this.closeNotification} />
      </ThemeProvider>
    );
  }
}

ConferenceDetailsContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onError: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ConferenceDetailsContainer.defaultProps = {
  onError: () => {},
};

export default withTranslation()(ConferenceDetailsContainer);
