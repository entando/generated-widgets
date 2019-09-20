import React, { PureComponent } from 'react';
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
      // custom event
    }
  }

  render() {
    const { events } = this.state;
    return <EventTable events={events} />;
  }
}
