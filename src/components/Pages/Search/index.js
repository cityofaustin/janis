import React, { useState, useEffect  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';

/*
  TO ADD...
  // import { searchWorker } from 'js/helpers/searchWorker'
  // import { PaginationContainer } from 'components/PageSections/Pagination/paginationContainer.js'
  // import { loader } from 'js/animations/loader';
*/

const SearchPage = () => {

  const { searchIndex } = useRouteData();

  console.log("searchIndex :", searchIndex)

  const title = "Search" // ⚠️useIntl

  return (
    <div>
      <Head>
        <title>Search</title>
      </Head>

      <PageHeader> {title} </PageHeader>

      <br /><h1> 🚧... Under Construction 🏗</h1>

    </div>
  )
}

export default SearchPage
