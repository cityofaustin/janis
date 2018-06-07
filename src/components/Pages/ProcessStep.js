import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

export default withRouteData(
  injectIntl(({
    processStep
  }) => {
    return <div>
      <div>Process: {processStep.page.title}</div>
      <div>Step #: {processStep.sortOrder}</div>
      <div>{processStep.name} - {processStep.url}</div>
    </div>;
  }),
);
