import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

export default withRouteData(
  injectIntl(({
    allProcessPages
  }) => {
    return <div>
      <div>All processes</div>
    </div>;
  }),
);
