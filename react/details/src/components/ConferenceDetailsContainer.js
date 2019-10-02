import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import ConferenceDetails from 'components/ConferenceDetails';
import ErrorNotification from 'components/common/ErrorNotification';
import ConferenceAPI from 'api/conference-api';

class ConferenceDetailsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      conference: [],
      error: null,
    };

    this.theme = createMuiTheme();
    this.closeNotification = this.closeNotification.bind(this);
    this.transformFields = this.transformFields.bind(this);
  }

  componentDidMount() {
    const { t, conferenceId, onError } = this.props;

    if (conferenceId) {
      ConferenceAPI.get({ id: conferenceId })
        .then(this.transformFields)
        .then(response => this.setState({ error: null, conference: response }))
        .catch(e => {
          onError(e);
          this.setState({ error: t('common.couldNotFetchData') });
        })
        .finally(() => this.setState({ loading: false }));
    } else {
      this.setState({ loading: false, error: t('common.missingId') });
    }
  }

  transformFields(conference) {
    const { t } = this.props;

    const entityName = 'conference';
    const translationKeyPrefix = `entities.${entityName}.`;

    return Object.keys(conference).reduce((acc, field) => {
      // if the field is an object or null - it's a relation to another entity
      const isEntityRelation = typeof conference[field] === 'object';

      if (isEntityRelation && conference[field] === null) {
        return acc;
      }

      if (isEntityRelation) {
        return [
          ...acc,
          {
            name: field,
            label: t(translationKeyPrefix + field),
            value: conference[field].id,
          },
        ];
      }

      return [
        ...acc,
        {
          name: field,
          label: t(translationKeyPrefix + field),
          value: conference[field],
        },
      ];
    }, []);
  }

  closeNotification() {
    this.setState({ error: null });
  }

  render() {
    const { conference, error, loading } = this.state;
    const { t } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        {loading && t('common.loading')}
        {!loading && <ConferenceDetails conference={conference} />}
        <ErrorNotification message={error} onClose={this.closeNotification} />
      </ThemeProvider>
    );
  }
}

ConferenceDetailsContainer.propTypes = {
  conferenceId: PropTypes.string.isRequired,
  onError: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ConferenceDetailsContainer.defaultProps = {
  onError: () => {},
};

export default withTranslation()(ConferenceDetailsContainer);
