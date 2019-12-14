/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, Component } from 'react';
import KeycloakContext from 'auth/KeycloakContext';

export default function withKeycloak(WrappedComponent) {
  class WithKeycloakComponent extends Component {
    renderWrappedComponent = value => {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent {...rest} ref={forwardedRef} keycloak={value} />;
    };

    render() {
      return <KeycloakContext.Consumer>{this.renderWrappedComponent}</KeycloakContext.Consumer>;
    }
  }

  return forwardRef((props, ref) => <WithKeycloakComponent {...props} forwardedRef={ref} />);
}
