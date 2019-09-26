import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import Widget from 'components/Widget';

class EntityDetailsElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const locale = this.getAttribute('locale') || 'en';
    i18next.changeLanguage(locale);

    const customEventPrefix = 'entity.details.';

    const onError = error => {
      const customEvent = new CustomEvent(`${customEventPrefix}error`, {
        details: {
          error,
        },
      });
      this.dispatchEvent(customEvent);
    };
    const entityName = this.getAttribute('entity');
    const entityElementId = this.getAttribute('entity-element-id');
    const reactComponent = React.createElement(Widget, { entityName, entityElementId, onError });
    ReactDOM.render(reactComponent, mountPoint);
  }
}

customElements.define('entity-details', EntityDetailsElement);
