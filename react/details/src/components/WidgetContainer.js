import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import Widget from 'components/Widget';
import EntityAPI from 'api/entity-api';

class WidgetContainer extends React.Component {
  static transformEntityFields(entity, entityName) {
    const translationKeyPrefix = `entities.${entityName}.`;

    return Object.keys(entity).reduce((acc, entityField) => {
      // if the entity field is an object or null - it's a relation to other entity
      const isEntityRelation = typeof entity[entityField] === 'object';

      if (isEntityRelation && entity[entityField] === null) {
        return acc;
      }

      if (isEntityRelation) {
        return [
          ...acc,
          {
            name: entityField,
            label: i18next.t(translationKeyPrefix + entityField),
            value: entity[entityField].id,
          },
        ];
      }

      return [
        ...acc,
        {
          name: entityField,
          label: i18next.t(translationKeyPrefix + entityField),
          value: entity[entityField],
        },
      ];
    }, []);
  }

  constructor(props) {
    super(props);

    this.theme = createMuiTheme();

    this.state = {
      loading: true,
      entity: {},
      error: null,
    };
  }

  componentDidMount() {
    const { entityName, entityElementId, onError } = this.props;

    if (entityName && entityElementId) {
      EntityAPI.get(entityName, { id: entityElementId })
        .then(response => response.json())
        .then(response => WidgetContainer.transformEntityFields(response, entityName))
        .then(response => this.setState({ error: null, entity: response }))
        .catch(e => {
          onError(e);
          this.setState({ error: i18next.t('common.couldNotFetchData') });
        })
        .finally(() => this.setState({ loading: false }));
    } else {
      this.setState({ error: i18next.t('common.missingProps') });
    }
  }

  static renderError() {
    return <div>{i18next.t('common.couldNotFetchData')}</div>;
  }

  render() {
    const { entity, error, loading } = this.state;
    const { entityName } = this.props;

    return (
      <ThemeProvider theme={this.theme}>
        {loading ? (
          i18next.t('common.loading')
        ) : (
          <Widget entity={entity} entityName={entityName} error={error} />
        )}
      </ThemeProvider>
    );
  }
}

WidgetContainer.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityElementId: PropTypes.string,
  onError: PropTypes.func,
};

WidgetContainer.defaultProps = {
  entityElementId: null,
  onError: () => {},
};

export default WidgetContainer;
