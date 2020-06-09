import React, { useState, useEffect  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { search as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import SearchResult from 'components/Pages/Search/searchResult.js'
import { searchWorker } from 'js/helpers/searchWorker'
import { queryObjectBuilder, queryStringBuilder } from 'js/helpers/queryObjectBuilder'

import PaginationContainer from 'components/PageSections/Pagination/paginationContainer.js'


const SearchPage = () => {

  const intl = useIntl();
  const lang = intl.locale
  const { searchIndex } = useRouteData();
  let query = queryObjectBuilder()
  let searchedTerm = query["?"] || ""


  useEffect(() => {
    // This will catch if the language is changed and refilter the search.
    updateSearch()
  }, [lang])

  useEffect(() => {
    /*
      This will catch a browser back or forward interaction and apply a new search
      if the search is different.
    */
    window.onpopstate = function(event) {
      updateSearch()
    };

    const input = document.getElementById("coa-search_input")
    input.focus()
    const filteredSearch = searchWorker(searchIndexWithUrl, input.value)
    setSearchResults(filteredSearch)
    if (typeof window !== 'undefined' && input.value.toLocaleLowerCase()) {
      query = queryObjectBuilder()
      query.page = query.page ? query.page : 1
      window.location.hash = queryStringBuilder(query)
      searchedTerm = query['?'] || ""
    }
  }, []);


  // React hook makes our input dynamic (useful for "as-you-type" filtering)
  let [ searchString, setSearchString ] = useState(searchedTerm)

  /*
   Don't show pages without Urls. There seems to be some pages that are 'live',
   but without a url - catch those here...
  */
  const searchIndexWithUrl = searchIndex.filter( page => page.janisUrls.length > 0)

  let [ searchResults, setSearchResults ] = useState(searchIndexWithUrl)

  const searchButtonPressed = () => {
    const results = document.getElementById('coa-search_results')
    results.style.opacity = 0
    setTimeout(function(){
      if (typeof window !== 'undefined') {
        query = queryObjectBuilder()
        query.page = 1
        query["?"] = searchString.toLocaleLowerCase()
        window.location.hash = queryStringBuilder(query)
      }
      results.style.opacity = 1
    },300) // Allows for CSS transtion to complete (./_Search.scss).
  }

  const updateSearch = () => {
    query = queryObjectBuilder()
    const filteredSearch = searchWorker(searchIndexWithUrl, query['?'] || "")
    setSearchResults(filteredSearch)
  }

  const searchKeyInput = event => {
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

      <div id="coa-search_results">
        <div className="wrapper container-fluid">
          <div className="row">

            <div className="col-xs-12 col-md-8">

            {searchedTerm && searchResults.length < 1 && (
              <NoResults intl={intl} searchedTerm={searchedTerm}/>
            )}

              <div className="coa-search_results-total">
                {searchedTerm && searchResults.length > 0 && (
                  <span>
                    {searchResults && searchResults.length + " "}

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

            </div>
          </div>
        </div>

        <PaginationContainer
          pagesArray={searchResults}
          PageComponent={SearchResult}
          searchedTerm={searchedTerm}
          intl={intl}
        />

      </div>
    </div>
  )
}

const NoResults = function({intl, searchedTerm}) {

  return (
    <div>
      <div className="coa-search_results-total">
        0&nbsp;
        {intl.formatMessage(i18n.results, {
          searchedTerm: (
            <em>
              "{searchedTerm}"
            </em>
          ),
        })}
      </div>
      <h2 className="coa-search_results-zero-message">
        {intl.formatMessage(i18n.noResultsHeader)}
      </h2>
      <div className="coa-search_results-zero">
        • {intl.formatMessage(i18n.suggestion1)} <br />
        • {intl.formatMessage(i18n.suggestion2)} <br />
        • {intl.formatMessage(i18n.suggestion3)} <br />
      </div>
    </div>
  )

}


export default SearchPage
