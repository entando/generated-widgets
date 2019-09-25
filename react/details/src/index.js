import React from 'react';
import ReactDOM from 'react-dom';

import Widget from 'components/Widget';

import 'i18n/i18n';
import 'index.scss';

// TODO: make entity name and ID dynamic
ReactDOM.render(
  <Widget entityName="authors" entityElementId="1" />,
  document.getElementById('root')
);
