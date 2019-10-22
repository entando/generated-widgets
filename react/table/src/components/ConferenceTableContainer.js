import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ConferenceTable from 'components/ConferenceTable';
import { withTranslation } from 'react-i18next';
import Notification from 'components/common/Notification';
import { apiConferencesGet } from 'api/conferences';
import { reducer, initialState } from 'state/conference.reducer';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class ConferenceTableContainer extends Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  state = initialState;

  componentDidMount() {
    this.fetchData();
  }

  dispatch(action) {
    this.setState(prevState => reducer(prevState, action));
  }

  async fetchData() {
    try {
      const conferences = await apiConferencesGet();
      this.dispatch({ type: 'readAll', payload: conferences });
    } catch (err) {
      this.handleError(err);
    }
  }

  closeNotification() {
    this.dispatch({ type: 'clearErrors' });
  }

  handleError(err) {
    const { onError, t } = this.props;
    onError(err);
    this.dispatch({ type: 'error', payload: t('conference.error.dataLoading') });
  }

  render() {
    const { onSelect, onAdd } = this.props;
    const { items, errorMessage } = this.state;
    return (
      <>
        <Fab color="primary" aria-label="add" onClick={onAdd}>
          <AddIcon />
        </Fab>
        <ConferenceTable items={items} onSelect={onSelect} />
        <Notification
          variant={Notification.ERROR}
          message={errorMessage}
          onClose={this.closeNotification}
        />
      </>
    );
  }
}

ConferenceTableContainer.propTypes = {
  onAdd: PropTypes.func,
  onError: PropTypes.func,
  onSelect: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ConferenceTableContainer.defaultProps = {
  onAdd: () => {},
  onError: () => {},
  onSelect: () => {},
};

export default withTranslation(undefined, { withRef: true })(ConferenceTableContainer);
