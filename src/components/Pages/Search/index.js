import React, { useState, use  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import { searchWorker } from 'js/helpers/searchWorker'
import { buildPages, buildPagination } from 'js/helpers/pagination.js'

const SearchPage = () => {

  const intl = useIntl();
  const { searchIndex } = useRouteData();
  const title = "Search" // ⚠️useIntl
  let searchedTerm = ""

  // Check the url has for a search term to apply
  if (window.location.hash.length > 1) {
    searchedTerm = decodeURIComponent(window.location.hash.split("#")[1])
  }

  // User react hook to make our input dynamic
  let [ searchString, setSearchString ] = useState(searchedTerm)

  // Don't show pages without Url
  const searchIndexWithUrl = searchIndex.edges.filter( page => page.node.janisUrls.length > 0)
  const filteredSearch = searchWorker(searchIndexWithUrl, searchString)

  // Use react hooks to allow dymanic updates without reload
  // - Note: we'll still be able to send these queries to Google Analyticss programatically.
  let [ searchResults, setSearchResults ] = useState(filteredSearch)

  const searchButtonPressed = function(x) {
    window.location.hash = searchString.toLocaleLowerCase()
    const filteredSearch = searchWorker(searchIndexWithUrl, searchString)
    setSearchResults(filteredSearch)
  }

  const searchKeyInput = function(event) {
    setSearchString(event.target.value)
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <PageHeader> {title} </PageHeader>

      <div>
        <input
          className="coa-searchPage_input"
          placeholder="..."
          onChange={()=>searchKeyInput(event)}
        />

        <button
          className="coa-searchPage_search-button"
          onClick={()=>searchButtonPressed('click')}
        >
          Search
        </button>
      </div>

      <div> &nbsp; {searchResults && searchResults.length} Results
        {searchedTerm && (
          <span>
            &nbsp;for <em>"{searchedTerm}"</em>
          </span>
        )}
      </div>

      { searchResults && searchResults.map( (page, i) => (
        <div key={i} style={{paddingLeft: 20 }}>
          <hr />

          Page Title : {page.node.title}

          <div> &nbsp; &bull; &nbsp;
            <span style={{fontSize: 16}}>
              {page.node.pageType}
            </span>
          </div>

          <div>
            <span style={{fontSize: 16}}>  &nbsp; Url: &nbsp;</span>
            <a style={{fontSize: 14}} href={page.node.janisUrls[0]}>
              {window.location.origin+page.node.janisUrls[0]}
            </a>
          </div>

          {page.node.summery &&
            <div>
              <p style={{fontSize: 14}}>
                {page.node.summery}
              </p>
            </div>
          }

        </div>
      )) }

    </div>
  )
}


export default SearchPage
