import React, { useState, useEffect  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { search as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import SearchResult from 'components/Pages/Search/searchResult.js'
import { searchWorker } from 'js/helpers/searchWorker'


const SearchPage = () => {

  const intl = useIntl();
  const { searchIndex } = useRouteData();
  let searchedTerm = ""

  useEffect(() => {
    const input = document.getElementById("coa-search_input")
    input.focus()
    const filteredSearch = searchWorker(searchIndexWithUrl, input.value)
    setSearchResults(filteredSearch)
    if (typeof window !== 'undefined') {
      window.location.hash = input.value.toLocaleLowerCase()
    }
  }, [searchIndex]);

  // Check the url for a search term to apply
  if (typeof window !== 'undefined' && window.location.hash.length > 1) {
    // TODO: ...when filters are added to the url, create an array instead and use the '&' standard.
    // const queryArr = decodeURIComponent(window.location.hash.split("#")[1]).split("&")
    // searchedTerm = queryArr[0]
    searchedTerm = decodeURIComponent(window.location.hash.split("#")[1])
  }

  // hook makes our input dynamic (useful for "as-you-type" filtering)
  let [ searchString, setSearchString ] = useState(searchedTerm)

  // Don't show pages without Url (there seems to be some pages that are 'live', but without a url - catch those here...)
  const searchIndexWithUrl = searchIndex.filter( page => page.janisUrls.length > 0)

  let [ searchResults, setSearchResults ] = useState(searchIndexWithUrl)

  const searchButtonPressed = function() {
    const results = document.getElementById('coa-search_results')
    results.style.opacity = 0
    if (typeof window !== 'undefined') {
      window.location.hash = searchString.toLocaleLowerCase()
    }
    const filteredSearch = searchWorker(searchIndexWithUrl, searchString)
    setTimeout(function(){
      setSearchResults(filteredSearch)
      results.style.opacity = 1
    },300) // Allows for CSS transtion to complete (./_Search.scss).
  }

  const searchKeyInput = function(event) {
    setSearchString(event.target.value)

    // For Quick Search (no-delay)... use 👇this, instead of that 👆.
    // const filteredSearch = searchWorker(searchIndexWithUrl, event.target.value)
    // setSearchResults(filteredSearch)
  }

  return (
    <div>

      <Head>
        <title> {intl.formatMessage(i18n.search)} </title>
      </Head>

      <PageHeader contentType={'search'}>
        {intl.formatMessage(i18n.search)}
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
            {intl.formatMessage(i18n.search)}
          </button>
        </div>
      </PageHeader>

      <div className="wrapper container-fluid">
        <div className="row">

          <div id="coa-search_results" className="col-xs-12 col-md-8">

            {searchedTerm && searchResults.length < 1 && (
              <NoResults />
            )}

            <div className="coa-search_results-total">
              {searchedTerm && searchResults.length > 0 && (
                <span>
                  {searchResults && searchResults.length}

                  {intl.formatMessage(i18n.results, {
                    searchedTerm: (
                      <em>
                        "{searchedTerm}"
                      </em>
                    ),
                  })}

                </span>
              )}
            </div>

            { searchResults && searchResults.map( (page, index) => (
              <SearchResult
                page={page}
                key={index}
              />
            )) }

          </div>

        </div>
      </div>


      {/*
        TODO: PAGINATION ( https://github.com/cityofaustin/techstack/issues/4358 )
        NOTE: It would be too much to handle all in one with this component like we've
        done on other pages.
        - Make paginationContainer.js
          <PaginationContainer
            results={searchResults}
          />
      */}

    </div>
  )
}

const NoResults = function() {

  return (
    <div>
      <div className="coa-search_results-total">
        0 results
      </div>
      <h2 className="coa-search_results-zero-message">
        There are no matching results. Improve your search results by:
      </h2>
      <div className="coa-search_results-zero">
        • double-checking your spelling <br />
        • using fewer keywords <br />
        • searching for something less specific <br />
      </div>
    </div>
  )

}

export default SearchPage
