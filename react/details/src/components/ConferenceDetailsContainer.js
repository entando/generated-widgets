import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import ConferenceDetails from 'components/ConferenceDetails';
import ErrorNotification from 'components/common/ErrorNotification';
import ConferenceAPI from 'api/conference-api';

class ConferenceDetailsContainer extends React.Component {
  static transformFields(conference) {
    const entityName = 'conference'; // lowercase singular
    const translationKeyPrefix = `entities.${entityName}.`;

    return Object.keys(conference).reduce((acc, field) => {
      // if the field is an object or null - it's a relation to another entity
      const isEntityRelation = typeof conference[field] === 'object';

      if (isEntityRelation && conference[field] === null) {
        return acc;
      }

      return [
        ...acc,
        {
          name: field,
          label: i18next.t(translationKeyPrefix + field),
          value: isEntityRelation ? conference[field].id : conference[field],
        },
      ];
    }, []);
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      conference: [],
      error: null,
    };

    this.theme = createMuiTheme();
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    const { elementId, onError } = this.props;

    if (elementId) {
      ConferenceAPI.get({ id: elementId })
        .then(response => ConferenceDetailsContainer.transformFields(response))
        .then(response => this.setState({ error: null, conference: response }))
        .catch(e => {
          onError(e);
          this.setState({ error: i18next.t('common.couldNotFetchData') });
        })
        .finally(() => this.setState({ loading: false }));
    } else {
      this.setState({ loading: false, error: i18next.t('common.missingProps') });
    }
  }

  closeNotification() {
    this.setState({ error: null });
  }

  render() {
    const { conference, error, loading } = this.state;

    return (
      <ThemeProvider theme={this.theme}>
        {loading && i18next.t('common.loading')}
        {!loading && <ConferenceDetails conference={conference} />}
        <ErrorNotification message={error} onClose={this.closeNotification} />
      </ThemeProvider>
    );
  }
}

ConferenceDetailsContainer.propTypes = {
  elementId: PropTypes.string,
  onError: PropTypes.func,
};

ConferenceDetailsContainer.defaultProps = {
  elementId: null,
  onError: () => {},
};

export default ConferenceDetailsContainer;
