import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

const LocationPage = ({ locationPage, intl }) => {
  const {
    locationPage: {
      title,
    }
  } = locationPage ? { locationPage } : useRouteData();

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        Oh boy a location page!
      </div>
    </div>
  )
}

export default injectIntl(LocationPage);
