import React, { useCallback, useEffect, useReducer } from 'react';
import ConferenceTable from 'components/ConferenceTable';

import Notification from 'components/common/Notification';
import { apiConferencesGet } from 'api/conferences';
import { useTranslation } from 'react-i18next';
import { reducer, initialState } from 'state/conference.reducer';
import { createCustomEventDispatcher, listenToCustomEvents } from 'helpers/customEvents';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const inputEvents = ['conference.form.update', 'conference.form.create', 'conference.form.delete'];
const outputEventPrefix = 'conference.table.';
const onError = createCustomEventDispatcher(`${outputEventPrefix}error`, 'error');
const onSelect = createCustomEventDispatcher(`${outputEventPrefix}select`, 'item');
const onAdd = createCustomEventDispatcher(`${outputEventPrefix}add`, 'item');

const ConferenceTableContainer = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleCustomEvent = evt => {
      dispatch({ type: evt.type.replace('conference.form.', ''), payload: evt.detail.item });
    };

    const removeCustomEventListenersFn = listenToCustomEvents(inputEvents, handleCustomEvent);
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
