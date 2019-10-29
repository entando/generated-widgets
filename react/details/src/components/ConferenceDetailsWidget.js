import React from 'react';

import AuthProvider from 'auth/AuthProvider';
import ConferenceDetailsContainer from 'components/ConferenceDetailsContainer';

const ConferenceDetailsWidget = props => (
  <AuthProvider>
    <ConferenceDetailsContainer {...props} />
  </AuthProvider>
);

export default ConferenceDetailsWidget;
