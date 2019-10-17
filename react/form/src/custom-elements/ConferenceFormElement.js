import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceEditFormContainer from 'components/ConferenceEditFormContainer';
import ConferenceAddFormContainer from 'components/ConferenceAddFormContainer';
import setLocale from 'i18n/setLocale';

import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import retargetEvents from 'react-shadow-dom-retarget-events';

class ConferenceFormElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(mountPoint);

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
    retargetEvents(shadowRoot);
  }
}

customElements.define('conference-form', ConferenceFormElement);
