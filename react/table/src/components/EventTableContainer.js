import i18next from 'i18next';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EventTable from 'components/EventTable';
import eventsGet from 'api/events';
import ErrorNotification from 'components/common/ErrorNotification';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

export default class EventTableContainer extends PureComponent {
  theme = createMuiTheme();

  state = {
    events: [],
    error: null,
  };

  async componentDidMount() {
    let events = [];

    try {
      const json = await eventsGet();
      events = json.map(event => ({
        ...event,
        start: new Date(event.start).toLocaleString(),
        end: new Date(event.start).toLocaleString(),
      }));
      this.setState({
        events,
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  closeNotification = () => {
    this.setState({ error: null });
  };

  handleError(err) {
    const { onError } = this.props;
    onError(err);
    this.setState({
      error: i18next.t('event.error.dataLoading'),
    });
  }

  render() {
    const { error, events } = this.state;
    const { onSelect } = this.props;
    return (
      <ThemeProvider theme={this.theme}>
        <EventTable events={events} onSelect={onSelect} />
        <ErrorNotification message={error} onClose={this.closeNotification} />
      </ThemeProvider>
    );
  }
}

EventTableContainer.propTypes = {
  onError: PropTypes.func,
  onSelect: PropTypes.func,
};

EventTableContainer.defaultProps = {
  onError: () => {},
  onSelect: () => {},
};
