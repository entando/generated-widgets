import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useReducer } from 'react';
import ConferenceTable from 'components/ConferenceTable';

import Notification from 'components/common/Notification';
import { apiConferencesGet } from 'api/conferences';
import { useTranslation } from 'react-i18next';
import { reducer, initialState } from 'state/conference.reducer';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import fluxStandardActionType from './__types__/fluxStandardActionType';

const ConferenceTableContainer = ({ onError, onSelect, onAdd, action }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);

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
  }, [onError, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (action) {
      dispatch(action);
    }
  }, [action]);

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

ConferenceTableContainer.propTypes = {
  action: fluxStandardActionType,
  onAdd: PropTypes.func,
  onError: PropTypes.func,
  onSelect: PropTypes.func,
};

ConferenceTableContainer.defaultProps = {
  action: undefined,
  onAdd: () => {},
  onError: () => {},
  onSelect: () => {},
};

export default ConferenceTableContainer;
