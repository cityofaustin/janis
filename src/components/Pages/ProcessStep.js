import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

const ProcessStep = ({ processStep, intl }) => (
  <div>
    {processStep.title} - {processStep.url}
  </div>
);

export default withRouteData(injectIntl(ProcessStep));
