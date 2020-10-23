import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import axios from 'axios';
import queryString from 'query-string';
import {
  useQueryParam,
  StringParam,
  NumberParam,
  withDefault,
} from 'use-query-params';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPageSelectorValues } from 'js/helpers/pagination.js';
import { filter as i18n1, form as i18n2 } from 'js/i18n/definitions';
import { createDateFromString } from 'js/helpers/date';
import { maxKeywordLength } from 'js/helpers/constants';
import Filter from 'components/PageSections/Pagination/Filter';
import PageSelector from 'components/PageSections/Pagination/PageSelector';

/**
  This is a Pagination Container for the OfficialDocumentCollectionPage
**/
const PaginationFiltered = ({
  PageComponent,
  officialDocumentCollectionId=null,
  lowerBound=(createDateFromString("2018-01-01")),
  CMS_API,
}) => {
  const searchApi = CMS_API.replace("/api/graphql", "/site_search")
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
  const [fromDate, setFromDate] = useQueryParam('fromDate', StringParam);
  const [toDate, setToDate] = useQueryParam('toDate', StringParam);
  const [searchedTerm, setSearchedTerm] = useQueryParam("q")
  const [filterApplied, setFilterApplied] = useState(Boolean(fromDate || toDate || searchedTerm))

  /**
    DayPicker lowerBound will be set by earliest official document in collection.
    upperBound should use the current date.
    Otherwise people might get confused that they can't filter up to the current day.
  **/
  const upperBound = new Date()

  // Reset PageNumber if it is invalid
  const resetPageNumber = () => {
    if ((totalPages && (pageNumber > totalPages)) || (pageNumber <= 0)) {
      setPageNumber(1)
    }
  }

  useEffect(resetPageNumber, [currentPageResults])

  // Get new currentPageResults
  useEffect(() => {
    const fetchData = async ()=>{
      try {
        let result = await axios.get(searchApi + "?" + queryString.stringify({
          lang: lang,
          page: pageNumber,
          limit: documentsPerPage,
          q: (searchedTerm || "").slice(0,maxKeywordLength),
          toDate: toDate,
          fromDate: fromDate,
          officialDocumentCollectionId: officialDocumentCollectionId,
        }))
        setTotalPages(result.data._meta.totalPages)
        setTotalResults(result.data._meta.totalResults)
        setCurrentPageResults(result.data.data)
        resetPageNumber()
      } catch (err) {
        // TODO: design + implement error handling
        setIsError(true)
      }
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchData()
  }, [pageNumber, searchedTerm, toDate, fromDate])

  /**
    Clear the filter by running
    applyFilter(null,null,nul).
    useQueryParams prefers using "undefined" instead of "null" to clear a queryParam
  **/
  const applyFilter = (fromDate, toDate, searchedTerm) => {
    setFromDate(fromDate || undefined)
    setToDate(toDate || undefined)
    setSearchedTerm(searchedTerm || undefined)
  }

  /**
    Check if we are using/removing a filter.
    This is done in a separate useEffect() besides the applyFilter() function,
    because a page could initially be loaded with a filter applied from the URL queryParams.
  **/
  useEffect(()=>{
    const newFilterApplied = Boolean(fromDate || toDate || searchedTerm)
    if (newFilterApplied !== filterApplied) {
      // Reset to page 1 if our filter status changes
      setFilterApplied(newFilterApplied)
      setPageNumber(1)
    }
  },[fromDate, toDate, searchedTerm])

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
          setPageNumber(pageNumber);
        },
      });
    }
  }

  const filterMessage = (totalResults === 1) ? (
    intl.formatMessage(i18n1.oneFilteredResult)
  ) : (
    intl.formatMessage(i18n1.filteredResults, {count: totalResults})
  )

  return (
    <div
      ref={paginationContainerRef}
      className="wrapper container-fluid"
      style={{"marginBottom": "42px"}}
    >
      <div className="row">
        <Filter
          applyFilter={applyFilter}
          fromDate={fromDate}
          toDate={toDate}
          searchedTerm={searchedTerm}
          lowerBound={lowerBound}
          upperBound={upperBound}
        />
        <div className="col-xs-12 col-lg-8">
          {filterApplied && (
            <div className="coa-filter__filter-result-container">
              <div className="coa-filter__filter-result-child">
                {filterMessage}
              </div>
              <div
                className="coa-filter__filter-result-clear"
                onClick={()=>{applyFilter(null,null)}}
              >
                <span>
                  {intl.formatMessage(i18n1.clearFilters)}
                </span>
                <i className="material-icons">close</i>
              </div>
            </div>
          )}
          {/**
            The "key" prop is necessary to indicate whether our component should re-animate.
            When the key changes, then our fadeIn animation is run.
            So if we update our fromDate, toDate, or activate/deactivate a filter, we'll get a fade-in transition.
          **/}
          {isError && (<div>There was an error fetching your query result.</div>)}
          {isLoading ? (<div className="coa-Pagination__loading">{intl.formatMessage(i18n2.loading)}</div>) : (
            <div
              className="coa-Pagination__fade-in"
              key={currentPageResults.map(page=>page.id).join("-")}
              ref={pageComponentContainerRef}
            >
              {currentPageResults && currentPageResults.map(page => (
                <PageComponent page={page} key={page.id} />
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

export default PaginationFiltered;
