import 'i18n/i18n';
import 'index.scss';
import 'custom-elements/EntityDetailsElement';

import React from 'react';
import ReactDOM from 'react-dom';

import Widget from 'components/WidgetContainer';

ReactDOM.render(
  <Widget entityName="authors" entityElementId="1" />,
  document.getElementById('root')
);
