import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

export default withRouteData(
  injectIntl(({
    processPage
  }) => {
    return <div>
      <div>Process: {processPage.title}</div>
    </div>;
  }),
);
