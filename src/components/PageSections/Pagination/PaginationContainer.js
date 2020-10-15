import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPageSelectorValues } from 'js/helpers/pagination.js';
import { queryObjectBuilder, queryStringBuilder } from 'js/helpers/queryObjectBuilder';
import { filter as i18n1 } from 'js/i18n/definitions';
import Filter from 'components/PageSections/Pagination/Filter';
import PageSelector from 'components/PageSections/Pagination/PageSelector';

const PaginationContainer = ({
  pagesArray,
  PageComponent,
  filterable=false,
  searchedTerm=null,
}) => {
  const intl = useIntl();
  const documentsPerPage = 10;
  const isMobile = useMobileQuery();
  const maxPagesMobile = 5;
  const maxPagesDesktop = 7;
  const maxPagesShown = isMobile ? maxPagesMobile : maxPagesDesktop;
  let query = queryObjectBuilder();
  const [isTransition, setIsTransition] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const pageComponentsRef = useRef();
  const [pages, setPages] = useState(buildPages(pagesArray, documentsPerPage));
  const pageSelectorValues = buildPageSelectorValues(pages, maxPagesShown, pageNumber);
  const currentPage = pages[pageNumber];
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

  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [filterApplied, setFilterApplied] = useState(false)

  /**
    Clear the filter by running
    applyFilter(null,null,false)
  **/
  const applyFilter = (fromDate, toDate, filterApplied) => {
    setFromDate(fromDate)
    setToDate(toDate)
    setFilterApplied(filterApplied)
  }

  /**
    We're using this function because:
    "Parsing of date strings with the Date constructor... is strongly discouraged due to browser differences and inconsistencies."
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

    So we convert a dateString from pagesArray "YYYY-MM-DD" into a valid Date.
    new Date("YYYY-MM-DD") will not work consistently but
    new Date("YYYY", "MM"-1, "DD") will work properly.
  **/
  function createDate(dateString) {
    let year, month, day;
    [year, month, day] = dateString.split("-")
    return new Date(year, month-1, day)
  }
  // Update pages when we get a new toDate or fromDate.
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
        if (createDate(page.date) >= fromDate) {
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
        if (createDate(page.date) <= toDate) {
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
    // When we update our pages be applying a filter, then reset our pageNumber to 0.
    setPageNumber(0);
  }, [pagesArray, fromDate, toDate])

  // Update pages when an updated searchedTerm updates the pagesArray
  useEffect(()=>{
    setPages(buildPages(pagesArray, documentsPerPage))
  }, [pagesArray])

  useEffect(() => {
    /*
      This hook will fire whenever there's a browser interaction.
      Like, a back button or a change in the url.
    */
    if (
      query.page &&
      pageNumber !== parseInt(query.page) - 1 &&
      isTransition === false
    ) {
      setPageNumber(parseInt(query.page - 1));
    }
  });

  useEffect(() => {
    /*
      The transition effect of changing pages puts a block on new renderings.
      So, we need to make sure there isn't a transition in effect before
      we zero-out the page when a new one renders.
    */
    if (pageNumber === 0 && isTransition === false) {
      updateUrl(0)
    }
  },[]);

  useEffect(() => {
    /*
      This hook checks to see if a new search term is used. And, sets it back
      to the first page. Like, if you are on page 3 of searching "police",
      and then search "recycling", you don't wanna go page 3 of the new search.
    */
    if (query.page) {
      setPageNumber(parseInt(query.page) - 1);
    } else {
      setPageNumber(0);
    }
  }, [searchedTerm]);

  const updatePage = newPage => {
    updateUrl(newPage)
    setPageNumber(newPage); // NOTE: hooks must be in the order
    setIsTransition(false);
  };

  const updateUrl = page => {
    query.page = parseInt(page) + 1
    if (typeof window !== 'undefined') {
      window.location.hash = queryStringBuilder(query)
    }
  }

  function changePage(newPage) {
    setIsTransition(true);
    if (
      newPage >= 0 &&
      newPage <= pages.length - 1 &&
      typeof window !== 'undefined'
    ) {
      scrollTransition({
        scrollDuration: 0.3, // Scroll effect duration, regardless of height, in seconds
        fadeDelay: 0.3, // for both fade in & out. so 2x times value here for full transition.
        element: window,
        fadeElement: pageComponentsRef.current,
        callback: () => {
          updatePage(newPage);
        }, // NOTE: callback will fire after fade OUT and BEFORE fade IN.
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
    <div className="wrapper container-fluid" style={{"marginBottom": "42px"}}>
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
                onClick={()=>{applyFilter(null,null,false)}}
              >
                <span>
                  {intl.formatMessage(i18n1.clearFilters)}
                </span>
                <i className="material-icons">close</i>
              </div>
            </div>
          )}
          <div ref={pageComponentsRef} id="paginationContainerElm">
            {currentPage &&
              currentPage.map((page, index) => (
                <PageComponent page={page} key={index} />
              ))}
          </div>
        </div>
        <PageSelector
          pageSelectorValues={pageSelectorValues}
          pageNumber={pageNumber}
          changePage={changePage}
        />
      </div>
    </div>
  );
};

export default PaginationContainer;
