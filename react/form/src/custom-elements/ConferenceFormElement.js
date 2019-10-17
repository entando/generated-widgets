import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';
import setLocale from 'i18n/setLocale';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';

class ConferenceFormElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(mountPoint);

    const id = this.getAttribute('id');
    const locale = this.getAttribute('locale');

    setLocale(locale);

    const jss = create({
      ...jssPreset(),
      insertionPoint: mountPoint,
    });

    const ReactRoot = id
      ? React.createElement(ConferenceEditFormContainer, { id }, null)
      : React.createElement(ConferenceAddFormContainer);
    ReactDOM.render(<StylesProvider jss={jss}>{ReactRoot}</StylesProvider>, mountPoint);
  }
}

customElements.define('conference-form', ConferenceFormElement);
