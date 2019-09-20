import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EventTable from 'components/EventTable';
import eventsGet from 'api/events';

export default class EventTableContainer extends PureComponent {
  state = {
    events: [],
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
      const { onError } = this.props;
      onError(err);
    }
  }

  render() {
    const { events } = this.state;
    const { onSelect } = this.props;
    return <EventTable events={events} onSelect={onSelect} />;
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
