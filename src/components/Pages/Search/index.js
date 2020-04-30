import React, { useState, useEffect  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import { searchWorker } from 'js/helpers/searchWorker'
import { PaginationContainer } from 'components/PageSections/Pagination/paginationContainer.js'
import { loader } from 'js/animations/loader';


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

  const searchButtonPressed = function() {
    window.location.hash = searchString.toLocaleLowerCase()
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
        <title>{title}</title>
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

      <div id="coa-search_loading_wheel" class="coa-loading_wheel"></div>

      <div id="coa-search_results">

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

            { page.node.janisbasepagewithtopics &&
              <div> &nbsp; &bull; &nbsp;
                <span style={{fontSize: 16}}>
                  topic{page.node.janisbasepagewithtopics.length > 1 && "s"}: &nbsp;
                  { page.node.janisbasepagewithtopics.join(', ') }
                </span>
              </div>
            }

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

    {/*
      TODO: PAGINATION ( <Issue-here> )
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
