import React from 'react';
import ConferenceEditFormContainer from './ConferenceEditFormContainer';
import ConferenceAddFormContainer from './ConferenceAddFormContainer';

export default id => (id ? <ConferenceEditFormContainer /> : <ConferenceAddFormContainer />);
