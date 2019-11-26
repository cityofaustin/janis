import React from 'react';

import UserFeedback from 'components/UserFeedback';

export default {
  title: 'Forms',
};

export const userFeedbackForm = () => <UserFeedback />;

userFeedbackForm.story = {
  name: 'UserFeedback Form',
};
