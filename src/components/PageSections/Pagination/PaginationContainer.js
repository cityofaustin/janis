import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import {
  useQueryParam,
  DateParam,
  NumberParam,
  withDefault,
} from 'use-query-params';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPageSelectorValues } from 'js/helpers/pagination.js';
import { filter as i18n1 } from 'js/i18n/definitions';
import { createDateFromString } from 'js/helpers/date';
import Filter from 'components/PageSections/Pagination/Filter';
import PageSelector from 'components/PageSections/Pagination/PageSelector';

const PaginationContainer = ({
  pagesArray,
  PageComponent,
  filterable=false,
}) => {
  const intl = useIntl();
  const isMobile = useMobileQuery();
  const documentsPerPage = 10;
  const maxPagesMobile = 5;
  const maxPagesDesktop = 7;
  const maxPagesShown = isMobile ? maxPagesMobile : maxPagesDesktop;
  const paginationContainerRef = useRef();
  const pageComponentContainerRef = useRef();
  const [pageNumber, setPageNumber] = useQueryParam('page', withDefault(NumberParam, 1));
  const [fromDate, setFromDate] = useQueryParam('fromDate', DateParam);
  const [toDate, setToDate] = useQueryParam('toDate', DateParam);
  const [filterApplied, setFilterApplied] = useState(false)
  const pageIndex = pageNumber-1;
  const [pages, setPages] = useState(buildPages(pagesArray, documentsPerPage));
  const pagesCount = pages.length

  // Update pages when an updated searchedTerm updates the pagesArray
  useEffect(()=>{
    setPages(buildPages(pagesArray, documentsPerPage))
  }, [pagesArray])

  // Reset PageNumber if it is invalid
  useEffect(()=>{
    if (!pages[pageIndex]) {
      setPageNumber(1)
    }
  },[pageNumber, toDate, fromDate])

  // Update pages when an updated searchedTerm updates the pagesArray
  useEffect(()=>{
    setPages(buildPages(pagesArray, documentsPerPage))
  }, [pagesArray])

  const pageSelectorValues = buildPageSelectorValues(pagesCount, maxPagesShown, pageNumber);
  const currentPage = pages[pageIndex];
  /**
    DayPicker lowerBound should be set by earliest official document in collection.
    OfficialDocuments are sorted in descending order, so the final document will be the earliest.
    upperBound should use the current date.
    Otherwise people might get confused that they can't filter up to the current day.
  **/
  let lowerBound, upperBound;
  if (filterable) {
    lowerBound = new Date(pagesArray[pagesArray.length-1].date)
    upperBound = new Date()
  }

  /**
    Clear the filter by running
    applyFilter(null,null).
    useQueryParams prefers using "undefined" instead of "null" to clear a queryParam
  **/
  const applyFilter = (fromDate, toDate) => {
    setFromDate(fromDate || undefined)
    setToDate(toDate || undefined)
  }

  /**
    Check if we are using/removing a filter.
    This is done in a separate useEffect() besides the applyFilter() function,
    because a page could initially be loaded with a filter applied from the URL queryParams.
  **/
  useEffect(()=>{
    let newFilterApplied;
    if (fromDate || toDate) {
      newFilterApplied = true
    } else {
      newFilterApplied = false
    }
    if (newFilterApplied !== filterApplied) {
      // Reset to page 1 if our filter status changes
      setFilterApplied(newFilterApplied)
      setPageNumber(1)
    }
  },[fromDate, toDate])

  // Update pages when we apply a new filter (toDate, fromDate).
  useEffect(()=>{
    if (!filterable) {
      return
    }
    let startIndex = null
    let endIndex = null
    /**
      Find the earliest page for pageArray (endIndex).
      Start at the last page in pageArray and work backwards
      (since pages are returned in reverse chronological order, newest first).
      Once we find the first page that is greater than or equal to the fromDate,
      then we know that every page before it will be greater than or equal to the fromDate.
    **/
    if (fromDate) {
      for (let i=(pagesArray.length-1); i>=0; i--) {
        let page = pagesArray[i]
        if (createDateFromString(page.date) >= fromDate) {
          endIndex = i
          break;
        }
      }
      // If no endIndex was found, then there are zero pages that are greater than the fromDate.
      if (endIndex === null) {
        setPages([])
        return
      }
    }
    /**
      Find the latest page for pageArray (startIndex).
      Start at the first page in pageArray and work forwards
      (since pages are returned in reverse chronological order, newest first).
      Once we find the first page that is less than or equal to the toDate,
      Then we know that every page after it will be less than or equal to the toDate.
    **/
    if (toDate && (endIndex > -1)) {
      for (let i=0; i<=(endIndex || (pagesArray.length-1)); i++) {
        let page = pagesArray[i]
        if (createDateFromString(page.date) <= toDate) {
          startIndex=i;
          break;
        }
      }
      // If no startIndex was found, then there are zero pages that are less than the toDate.
      if (startIndex === null) {
        setPages([])
        return
      }
    }

    if (startIndex === null) {
      startIndex = 0
    }
    if (endIndex === null) {
      endIndex = (pagesArray.length-1)
    }
    const filteredPagesArray = pagesArray.slice(startIndex, endIndex+1)
    setPages(buildPages(filteredPagesArray, documentsPerPage))
  }, [fromDate, toDate])

  function changePage(pageNumber) {
    if (
      pageNumber >= 1 &&
      pageNumber <= pages.length
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

  let filterMessage = "";
  if (filterApplied) {
    const totalResultCount = pages.reduce((resultCount,page)=>resultCount+page.length, 0)
    if (totalResultCount === 1) {
      filterMessage = intl.formatMessage(i18n1.OneFilteredResult)
    } else {
      filterMessage = intl.formatMessage(i18n1.filteredResults, {count: totalResultCount})
    }
  }

  return (
    <div
      ref={paginationContainerRef}
      className="wrapper container-fluid"
      style={{"marginBottom": "42px"}}
    >
      <div className="row">
        {filterable && (
          <Filter
            applyFilter={applyFilter}
            fromDate={fromDate}
            toDate={toDate}
            lowerBound={lowerBound}
            upperBound={upperBound}
          />
        )}
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
          <div
            className="coa-Pagination__page-component-container"
            key={String(pageNumber) + fromDate + toDate + filterApplied}
            ref={pageComponentContainerRef}
          >
            {currentPage && currentPage.map((page, index) => (
              <PageComponent page={page} key={page.id} />
            ))}
          </div>
        </div>
        <PageSelector
          pageSelectorValues={pageSelectorValues}
          pageNumber={pageNumber}
          pagesCount={pagesCount}
          changePage={changePage}
        />
      </div>
    </div>
  );
};

export default PaginationContainer;
