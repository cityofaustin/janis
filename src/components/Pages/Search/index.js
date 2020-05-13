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

  useEffect(() => {
    const input = document.getElementById("coa-search_input")
    input.focus()
  }, []);

  // Check the url has for a search term to apply
  if (typeof window !== 'undefined' && window.location.hash.length > 1) {
    searchedTerm = decodeURIComponent(window.location.hash.split("#")[1])
  }

  // User react hook to make our input dynamic
  let [ searchString, setSearchString ] = useState(searchedTerm)

  // Don't show pages without Url
  const searchIndexWithUrl = searchIndex.filter( page => page.janisUrls.length > 0)

  const filteredSearch = searchWorker(searchIndexWithUrl, searchString)

  // Use react hooks to allow dymanic updates without reload
  // - Note: we'll still be able to send these queries to Google Analyticss programatically.
  let [ searchResults, setSearchResults ] = useState(filteredSearch)

  const searchButtonPressed = function() {
    loader.start({
      contentId: 'coa-search_results',
      loaderId: 'coa-search_loading_wheel',
    })
    setTimeout(function(){
      if (typeof window !== 'undefined') {
        window.location.hash = searchString.toLocaleLowerCase()
      }
      const filteredSearch = searchWorker(searchIndexWithUrl, searchString)
      setSearchResults(filteredSearch)
      loader.end()
    },1000)
  }

  const searchKeyInput = function(event) {
    setSearchString(event.target.value)

    // 📝Quick Search Delay...
    // const filteredSearch = searchWorker(searchIndexWithUrl, event.target.value)
    // setSearchResults(filteredSearch)
    // ...
  }

  return (
    <div>

      <Head>
        <title> {title} </title>
      </Head>

      <PageHeader contentType={'search'}>
        {title}
        <div className="coa-search_bar_container">
          <input
            id="coa-search_input"
            className="coa-search_inputs"
            onChange={()=>searchKeyInput(event)}
            value={searchString}
          />

          <button
            className="coa-search_button"
            onClick={()=>searchButtonPressed('click')}
          >
            Search
          </button>
        </div>
      </PageHeader>

      <div id="coa-search_loading_wheel" className="coa-loading_wheel"></div>

      <div className="wrapper container-fluid">
        <div className="row">

          <div id="coa-search_results" className="col-xs-12 col-md-8">

            <div className="coa-search_results-total">
              {searchResults && searchResults.length} Results
              {searchedTerm && (
                <span>
                  &nbsp;for <em>"{searchedTerm}"</em>
                </span>
              )}
            </div>

            { searchResults && searchResults.map( (page, i) => (
              <SearchResult
                page={page}
                key={i}
              ></SearchResult>
            )) }

          </div>

        </div>
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
