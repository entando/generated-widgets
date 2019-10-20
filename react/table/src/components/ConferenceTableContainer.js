import React, { useCallback, useEffect, useReducer } from 'react';
import ConferenceTable from 'components/ConferenceTable';

import Notification from 'components/common/Notification';
import { apiConferencesGet } from 'api/conferences';
import { useTranslation } from 'react-i18next';
import { reducer, initialState } from 'state/conference.reducer';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { publishWidgetEvent, subscribeToWidgetEvents } from 'helpers/widgetEvents';

const inputEvents = ['conference.form.update', 'conference.form.create', 'conference.form.delete'];
const onError = payload => publishWidgetEvent('conference.table.error', payload);
const onSelect = payload => publishWidgetEvent('conference.table.select', payload);
const onAdd = payload => publishWidgetEvent('conference.table.add', payload);

const ConferenceTableContainer = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleCustomEvent = evt => {
      dispatch({ type: evt.type.replace('conference.form.', ''), payload: evt.detail.payload });
    };

    const removeCustomEventListenersFn = subscribeToWidgetEvents(inputEvents, handleCustomEvent);
    return removeCustomEventListenersFn;
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
      <Fab color="primary" aria-label="add" onClick={onAdd}>
        <AddIcon />
      </Fab>
      <ConferenceTable items={state.items} onSelect={onSelect} />
      <Notification variant="error" message={state.errorMessage} onClose={closeNotification} />
    </>
  );
};

export default ConferenceTableContainer;
