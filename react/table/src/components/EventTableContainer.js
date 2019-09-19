import React, { PureComponent } from 'react';
import EventTable from 'components/EventTable';
import mockEvents from 'mockEvents';

export default class EventTableContainer extends PureComponent {
  DOMAIN = process.env.REACT_APP_DOMAIN;

  JWT_TOKEN = process.env.REACT_APP_JWT_TOKEN;

  API = '/events';

  state = {
    events: [],
  };

  async componentDidMount() {
    this.setState({
      events: mockEvents,
    });
  }

  render() {
    const { events } = this.state;
    return <EventTable events={events} />;
  }
}
