import i18next from 'i18next';
import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import ConferenceTable from 'components/ConferenceTable';

import Notification from 'components/common/Notification';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { apiConferencesGet } from 'api/conferences';

const initialState = {
  items: [],
  errorMessage: null,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'readAll':
      return { ...state, items: action.payload };
    case 'create':
      return { ...state, items: [...state.items, action.payload] };
    case 'update': {
      const i = state.items.findIndex(item => {
        return item.id === action.payload.id;
      });
      const items = [...state.items];
      items[i] = action.payload;
      return { ...state, items };
    }
    case 'delete':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    case 'error':
      return { ...state, errorMessage: action.payload };
    case 'clearErrors':
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

const ConferenceTableContainerWithHooks = ({ onError, onSelect }) => {
  const theme = createMuiTheme();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const supportedCustomEventTypes = [
      'conference.form.update',
      'conference.form.create',
      'conference.form.delete',
    ];

    const handleCustomEvent = evt => {
      dispatch({ type: evt.type.replace('conference.form.', ''), payload: evt.detail.item });
    };

    supportedCustomEventTypes.forEach(eventType =>
      window.addEventListener(eventType, handleCustomEvent)
    );

    return () => {
      supportedCustomEventTypes.forEach(eventType =>
        window.removeEventListener(eventType, handleCustomEvent)
      );
    };
  }, []);

  useEffect(() => {
    const handleError = err => {
      onError(err);
      dispatch({ type: 'error', payload: i18next.t('conference.error.dataLoading') });
    };

    const fetchData = async () => {
      try {
        const json = await apiConferencesGet();
        const conferences = json.map(conference => ({
          ...conference,
          start: new Date(conference.start).toLocaleString(),
          end: new Date(conference.start).toLocaleString(),
        }));

        dispatch({ type: 'readAll', payload: conferences });
      } catch (err) {
        handleError(err);
      }
    };
    fetchData();
  }, [onError]);

  const closeNotification = () => dispatch({ type: 'clearErrors' });

  return (
    <ThemeProvider theme={theme}>
      <ConferenceTable items={state.items} onSelect={onSelect} />
      <Notification variant="error" message={state.errorMessage} onClose={closeNotification} />
    </ThemeProvider>
  );
};

ConferenceTableContainerWithHooks.propTypes = {
  onError: PropTypes.func,
  onSelect: PropTypes.func,
};

ConferenceTableContainerWithHooks.defaultProps = {
  onError: () => {},
  onSelect: () => {},
};

export default ConferenceTableContainerWithHooks;
