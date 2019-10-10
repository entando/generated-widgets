import i18next from 'i18next';
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import EventTable from 'components/EventTable';
import eventsGet from 'api/events';
import ErrorNotification from 'components/common/ErrorNotification';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const initialState = { events: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'readAll':
      return { ...state, events: action.payload };
    case 'create':
      return { ...state, events: [...state.events, action.payload] };
    case 'update': {
      const i = state.events.findIndex(event => {
        return event.id === action.payload.id;
      });
      const events = [...state.events];
      events[i] = action.payload;
      return { ...state, events };
    }
    case 'delete':
      return { ...state, events: state.events.filter(event => event.id !== action.payload.id) };
    default:
      return state;
  }
};

const EventTableContainerWithHooks = ({ onError, onSelect }) => {
  const theme = createMuiTheme();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const supportedEventTypes = [
      'conference.form.update',
      'conference.form.create',
      'conference.form.delete',
    ];

    const handleCustomEvent = evt => {
      dispatch({ type: evt.type.replace('conference.form.', ''), payload: evt.detail.item });
    };

    supportedEventTypes.forEach(eventType => window.addEventListener(eventType, handleCustomEvent));

    return () => {
      supportedEventTypes.forEach(eventType =>
        window.removeEventListener(eventType, handleCustomEvent)
      );
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const json = await eventsGet();
      const events = json.map(event => ({
        ...event,
        start: new Date(event.start).toLocaleString(),
        end: new Date(event.start).toLocaleString(),
      }));

      dispatch({ type: 'readAll', payload: events });
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <EventTable events={state.events} onSelect={onSelect} />
    </ThemeProvider>
  );
};

EventTableContainerWithHooks.propTypes = {
  onError: PropTypes.func,
  onSelect: PropTypes.func,
};

EventTableContainerWithHooks.defaultProps = {
  onError: () => {},
  onSelect: () => {},
};

export default EventTableContainerWithHooks;
