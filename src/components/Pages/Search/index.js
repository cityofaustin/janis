import React, { useState, useEffect  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import SearchResult from 'components/Pages/Search/searchResult.js'

/* - - - TO DO: Finish Janis Search Page
  - Issue: https://github.com/cityofaustin/techstack/issues/4285
  // import { searchWorker } from 'js/helpers/searchWorker'
  // import { loader } from 'js/animations/loader';
*/

const SearchPage = () => {

  const { searchIndex } = useRouteData();

  console.log("searchIndex :", searchIndex)

  const title = "Search" // TODDO: ⚠️useIntl

  return (
    <div>
      <Head>
        <title> {title} </title>
      </Head>

      <PageHeader> {title} </PageHeader>

      <br /><h1> &nbsp; &nbsp; 🚧... Under Construction 🏗</h1>

      {/* - - - TO DO: Finish Janis Search Page - - - - - */}

      { searchIndex && searchIndex.map( (page, i) => (
        <SearchResult
          page={page}
          key={i}
        ></SearchResult>
      )) }

      {/* - - - TO DO: Finish Janis Search Page - - - - - */}

    </div>
  )
}

export default SearchPage
