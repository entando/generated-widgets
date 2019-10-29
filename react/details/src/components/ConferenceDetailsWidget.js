import React from 'react';

import AuthProvider from 'auth/AuthProvider';
import ConferenceDetailsContainer from 'components/ConferenceDetailsContainer';

const ConferenceDetailsWidget = props => (
  <AuthProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <ConferenceDetailsContainer {...props} />
  </AuthProvider>
);

export default ConferenceDetailsWidget;
