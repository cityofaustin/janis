import React, { useState, useEffect  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import {
  useQueryParam,
  StringParam,
  NumberParam,
  withDefault,
} from 'use-query-params';

import { search as i18n } from 'js/i18n/definitions';
import PageHeader from 'components/PageHeader';
import SearchResult from 'components/Pages/Search/searchResult.js'
import { searchWorker } from 'js/helpers/searchWorker'
import { queryObjectBuilder, queryStringBuilder } from 'js/helpers/queryObjectBuilder'
import PaginationContainer from 'components/PageSections/Pagination/PaginationContainer.js'

const SearchPage = () => {
  const { searchIndex: unfilteredSearchIndex } = useRouteData();
  /*
   Don't show pages without Urls. There seems to be some pages that are 'live',
   but without a url - catch those here...
  */
  const searchIndex = unfilteredSearchIndex.filter( page => page.janisUrls.length > 0)
  const intl = useIntl();
  const lang = intl.locale
  const [searchedTerm, setSearchedTerm] = useQueryParam("q", StringParam)
  const [pageNumber, setPageNumber] = useQueryParam('page', withDefault(NumberParam, 1));
  const [searchString, setSearchString] = useState(searchedTerm)
  const [searchResults, setSearchResults] = useState([])

  // Reset back to first page with a new searchedTerm
  useEffect(()=>{
    setPageNumber(1)
  },[searchedTerm])

  useEffect(()=>{
    setSearchResults(searchWorker(searchIndex, searchedTerm))
  }, [searchedTerm, unfilteredSearchIndex])

  const searchKeyInput = event => {
    if (event.key === "Enter") {
      setSearchedTerm(searchString)
    } else {
      setSearchString(event.target.value)
    }
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
            onKeyPress={()=>searchKeyInput(event)}
            value={searchString}
          />
          <button
            className="coa-search_button"
            onClick={()=>setSearchedTerm(searchString)}
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
