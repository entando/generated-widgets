import React, { useCallback, useEffect, useReducer } from 'react';
import ConferenceTable from 'components/ConferenceTable';

import Notification from 'components/common/Notification';
import { apiConferencesGet } from 'api/conferences';
import { useTranslation } from 'react-i18next';
import { reducer, initialState } from 'state/conference.reducer';

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

  const { t } = useTranslation();
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
      const conferences = await apiConferencesGet();
      dispatch({ type: 'readAll', payload: conferences });
    } catch (err) {
      handleError(err);
    }
  }, [t]);

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
