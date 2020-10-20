import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import axios from 'axios';
import queryString from 'query-string';
import {
  useQueryParam,
  NumberParam,
  withDefault,
} from 'use-query-params';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPageSelectorValues } from 'js/helpers/pagination.js';
import PageSelector from 'components/PageSections/Pagination/PageSelector';
import SearchResult from 'components/Pages/Search/searchResult.js'

/**
  This is a Pagination Container for the searchPage
**/
const PaginationSearchPage = ({
  searchedTerm="",
}) => {
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
  const [currentPageResults, setCurrentPageResults] = useState([])

  // Reset PageNumber if it is invalid
  useEffect(()=>{
    if ((pageNumber > totalPages) || (pageNumber <= 0)) {
      setPageNumber(1)
    }
  },[pageNumber, searchedTerm])

  // Get new currentPageResults
  useEffect(() => {
    const fetchData = async ()=>{
      let result = await axios.get("http://localhost:8000/site_search?" + queryString.stringify({
        lang: lang,
        q: searchedTerm,
        page: pageNumber,
        limit: documentsPerPage,
      }))
      if (result.status === 200) {
        console.log("~~~ my result", result.data)
        setTotalPages(result.data._meta.totalPages)
        setCurrentPageResults(result.data.data)
        setIsLoading(false)
      } else {
        // TODO: design + implement error handling
        setIsLoading(false)
        setIsError(true)
      }
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

  return (
    <div
      ref={paginationContainerRef}
      className="wrapper container-fluid"
      style={{"marginBottom": "42px"}}
    >
      <div className="row">
        <div className="col-xs-12 col-lg-8">
          {/**
            The "key" prop is necessary to indicate whether our component should re-animate.
            When the key changes, then our fadeIn animation is run.
            So if we update our fromDate, toDate, or activate/deactivate a filter, we'll get a fade-in transition.
            // TODO: add searchedTerm to key
          **/}
          {isError && (<div>There was an error fetching your query result.</div>)}
          {isLoading ? (<div className="coa-Pagination__loading">Loading...</div>) : (
            <div
              className="coa-Pagination__page-component-container"
              key={currentPageResults.map(page=>page.id).join("-")}
              ref={pageComponentContainerRef}
            >
              {currentPageResults && currentPageResults.map(page => (
                <SearchResult page={page} key={page.id} />
              ))}
            </div>
          )}
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

export default PaginationSearchPage;
