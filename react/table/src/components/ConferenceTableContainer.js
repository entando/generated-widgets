import React, { useCallback, useEffect, useReducer } from 'react';
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

const ConferenceTableContainer = () => {
  const customEventPrefix = 'conference.table.';

  const onError = error => {
    const customEvent = new CustomEvent(`${customEventPrefix}error`, {
      detail: {
        error,
      },
    });
    window.dispatchEvent(customEvent);
  };

  const onSelect = item => {
    const customEvent = new CustomEvent(`${customEventPrefix}select`, {
      detail: {
        item,
      },
    });
    window.dispatchEvent(customEvent);
  };

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

  const fetchData = useCallback(async () => {
    const handleError = err => {
      onError(err);
      dispatch({ type: 'error', payload: t('conference.error.dataLoading') });
    };

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
  }, [language, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const closeNotification = () => dispatch({ type: 'clearErrors' });

  return (
    <>
      <ConferenceTable items={state.items} onSelect={onSelect} />
      <Notification variant="error" message={state.errorMessage} onClose={closeNotification} />
    </>
  );
};

export default ConferenceTableContainer;
