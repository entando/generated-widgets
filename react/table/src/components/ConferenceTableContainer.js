import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import ConferenceTable from 'components/ConferenceTable';

import Notification from 'components/common/Notification';
import { apiConferencesGet } from 'api/conferences';
import { useTranslation } from 'react-i18next';

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

const ConferenceTableContainer = props => {
  const { onError, onSelect } = props;
  const {
    t,
    i18n: { language },
  } = useTranslation();
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
      dispatch({ type: 'error', payload: t('conference.error.dataLoading') });
    };

    const fetchData = async () => {
      try {
        const json = await apiConferencesGet();
        const conferences = json.map(conference => ({
          ...conference,
          start: new Date(conference.start).toLocaleString(language),
          end: new Date(conference.start).toLocaleString(language),
        }));

        dispatch({ type: 'readAll', payload: conferences });
      } catch (err) {
        handleError(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeNotification = () => dispatch({ type: 'clearErrors' });

  return (
    <>
      <ConferenceTable items={state.items} onSelect={onSelect} />
      <Notification variant="error" message={state.errorMessage} onClose={closeNotification} />
    </>
  );
};

ConferenceTableContainer.propTypes = {
  onError: PropTypes.func,
  onSelect: PropTypes.func,
};

ConferenceTableContainer.defaultProps = {
  onError: () => {},
  onSelect: () => {},
};

export default ConferenceTableContainer;
