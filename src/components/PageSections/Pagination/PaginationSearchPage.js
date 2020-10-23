import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import axios from 'axios';
import queryString from 'query-string';
import {
  useQueryParam,
  NumberParam,
  withDefault,
} from 'use-query-params';
import { search as i18n } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPageSelectorValues } from 'js/helpers/pagination.js';
import { form as i18n2 } from 'js/i18n/definitions';
import { maxKeywordLength } from 'js/helpers/constants';
import PageSelector from 'components/PageSections/Pagination/PageSelector';
import SearchResult from 'components/Pages/Search/searchResult.js'

/**
  This is a Pagination Container for the SearchPage
**/
const PaginationSearchPage = ({
  searchedTerm="",
}) => {
  const searchApi = process.env.CMS_API.replace("/api/graphql", "/site_search")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const intl = useIntl();
  const lang = intl.locale
  const isMobile = useMobileQuery();
  const documentsPerPage = 10;
  const maxPagesShown = isMobile ? 5 : 7;
  const paginationContainerRef = useRef();
  const pageComponentContainerRef = useRef();

  const [pageNumber, setPageNumber] = useQueryParam('page', withDefault(NumberParam, 1));
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPageResults, setCurrentPageResults] = useState([])

  // Reset PageNumber if it is invalid
  const resetPageNumber = () => {
    if ((totalPages && (pageNumber > totalPages)) || (pageNumber <= 0)) {
      setPageNumber(1)
    }
  }
  useEffect(resetPageNumber,[pageNumber, searchedTerm])

  // Get new currentPageResults
  useEffect(() => {
    const fetchData = async ()=>{
      try {
        let result = await axios.get(searchApi + "?" + queryString.stringify({
          lang: lang,
          page: pageNumber,
          limit: documentsPerPage,
          q: (searchedTerm || "").slice(0,maxKeywordLength),
        }))
        setTotalPages(result.data._meta.totalPages)
        setTotalResults(result.data._meta.totalResults)
        setCurrentPageResults(result.data.data)
        resetPageNumber()
      } catch(err) {
        // TODO: design + implement error handling
        setIsError(true)
      }
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchData()
  }, [pageNumber, searchedTerm])

  function changePage(pageNumber) {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages
    ) {
      scrollTransition({
        scrollDuration: 0.3, // Scroll effect duration, regardless of height, in seconds
        endpoint: paginationContainerRef.current.offsetTop,
        fadeElement: pageComponentContainerRef.current,
        callback: () => {
          setIsLoading(true)
          setPageNumber(pageNumber);
        },
      });
    }
  }

  let result;
  if (isError) {
    result = <div>There was an error fetching your query result.</div>
  } else if (isLoading) {
    result = <div className="coa-Pagination__loading">{intl.formatMessage(i18n2.loading)}</div>
  } else {
    result = (
      <div>
        <SearchResultsMessage
          searchedTerm={searchedTerm}
          totalResults={totalResults}
        />
        {/**
          The "key" prop is necessary to indicate whether our component should re-animate.
          When the key changes, then our fadeIn animation is run.
          So if we update our fromDate, toDate, or activate/deactivate a filter, we'll get a fade-in transition.
        **/}
        <div
          className="coa-Pagination__fade-in"
          key={currentPageResults.map(page=>page.id).join("-")}
          ref={pageComponentContainerRef}
        >
          {currentPageResults && currentPageResults.map(page => (
            <SearchResult page={page} key={page.id} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={paginationContainerRef}
      className="wrapper container-fluid"
      style={{"marginBottom": "42px"}}
    >
      <div className="row">
        <div className="col-xs-12 col-lg-8">
          {result}
        </div>
        <PageSelector
          pageSelectorValues={buildPageSelectorValues(totalPages, maxPagesShown, pageNumber)}
          pageNumber={pageNumber}
          pagesCount={totalPages}
          changePage={changePage}
        />
      </div>
    </div>
  );
};

const SearchResultsMessage = ({searchedTerm, totalResults})=>{
  const intl = useIntl()
  return (
    <div className="coa-Pagination__fade-in">
      {(searchedTerm && totalResults < 1) ? (
        <NoResults searchedTerm={searchedTerm}/>
      ): (
        <div className="coa-search_results-total">
          {searchedTerm && totalResults > 0 && (
            <span>
              {searchedTerm && totalResults + " "}
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
      )}
    </div>
  )
}

const NoResults = function({searchedTerm}) {
  const intl = useIntl()
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

export default PaginationSearchPage;
