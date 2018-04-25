import React from 'react';
import { storiesOf } from '@storybook/react';

import FormFeedback from 'js/modules/FormFeedback';

storiesOf('Forms', module)
  .add('Feedback Form', () => (
    <div className="wrapper wrapper--sm container-fluid">
      <FormFeedback />
    </div>
  ))
