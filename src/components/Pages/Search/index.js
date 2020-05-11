import React, { useState, useEffect  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import SearchResult from 'components/Pages/Search/searchResult.js'
import { searchWorker } from 'js/helpers/searchWorker'
import { loader } from 'js/animations/loader';

/* - - - TO DO: Finish Janis Search Page
  - Issue: https://github.com/cityofaustin/techstack/issues/4285
  // import { searchWorker } from 'js/helpers/searchWorker'
  // import { loader } from 'js/animations/loader';
*/

const SearchPage = () => {

  const intl = useIntl();
  const { searchIndex } = useRouteData();
  const title = "Search" // TODO: ⚠️useIntl
  let searchedTerm = ""

  // Check the url has for a search term to apply
  // if (window.location.hash.length > 1) {
  //   searchedTerm = decodeURIComponent(window.location.hash.split("#")[1])
  // }

  // User react hook to make our input dynamic
  let [ searchString, setSearchString ] = useState(searchedTerm)

  // Don't show pages without Url
  const searchIndexWithUrl = searchIndex.filter( page => page.janisUrls.length > 0)

  const filteredSearch = searchWorker(searchIndexWithUrl, searchString)

  // Use react hooks to allow dymanic updates without reload
  // - Note: we'll still be able to send these queries to Google Analyticss programatically.
  let [ searchResults, setSearchResults ] = useState(filteredSearch)

  const searchButtonPressed = function() {
    // window.location.hash = searchString.toLocaleLowerCase()
    loader.start({
      contentId: 'coa-search_results',
      loaderId: 'coa-search_loading_wheel',
    });
    setTimeout(function(){
      const filteredSearch = searchWorker(searchIndexWithUrl, searchString)
      setSearchResults(filteredSearch)
      loader.end();
    },1000)
  }

  const searchKeyInput = function(event) {
    setSearchString(event.target.value)
  }

  return (
    <div>
      <Head>
        <title> {title} </title>
      </Head>

      <PageHeader> {title} </PageHeader>

      <div>
        <input
          className="coa-searchPage_input"
          placeholder="..."
          onChange={()=>searchKeyInput(event)}
          value={searchString}
        />

        <button
          className="coa-searchPage_search-button"
          onClick={()=>searchButtonPressed('click')}
        >
          Search
        </button>
      </div>

      <div id="coa-search_loading_wheel" className="coa-loading_wheel"></div>

      <div id="coa-search_results">
        { searchResults && searchResults.map( (page, i) => (
          <SearchResult
            page={page}
            key={i}
          ></SearchResult>
        )) }
      </div>

      {/*
        TODO: PAGINATION ( https://github.com/cityofaustin/techstack/issues/4358 )
        NOTE: it would be too much to handle all in one with this component like we've
        done on other Pages. Needs to be cleaned up as a component and checked for
        regression with other pages.
        👀SEE: paginationContainer.js
          <PaginationContainer
            results={searchResults}
          />
      */}

    </div>
  )
}

export default SearchPage
