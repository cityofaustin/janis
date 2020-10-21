import React, { useState, useEffect, useRef } from 'react';
import {
  useQueryParam,
  NumberParam,
  withDefault,
} from 'use-query-params';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPageSelectorValues } from 'js/helpers/pagination.js';
import PageSelector from 'components/PageSections/Pagination/PageSelector';

/**
  This is a Pagination Container that has no dynamic searching.
  It gets a static pagesArray that contains every pagination page without querying the API.
  Examples: EventPage, NewsPage.
**/
const PaginationStatic = ({
  pagesArray,
  PageComponent,
  searchedTerm="",
}) => {
  const isMobile = useMobileQuery();
  const documentsPerPage = 10;
  const maxPagesMobile = 5;
  const maxPagesDesktop = 7;
  const maxPagesShown = isMobile ? maxPagesMobile : maxPagesDesktop;
  const paginationContainerRef = useRef();
  const pageComponentContainerRef = useRef();
  const [pageNumber, setPageNumber] = useQueryParam('page', withDefault(NumberParam, 1));
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
  },[pageNumber])

  // Update pages when an updated searchedTerm updates the pagesArray
  useEffect(()=>{
    setPages(buildPages(pagesArray, documentsPerPage))
  }, [pagesArray])

  const pageSelectorValues = buildPageSelectorValues(pagesCount, maxPagesShown, pageNumber);
  const currentPage = pages[pageIndex];

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
            So if we update our searchedTerm, we'll get a fade-in transition.
          **/}
          <div
            className="coa-Pagination__fade-in"
            key={String(pageNumber) + searchedTerm}
            ref={pageComponentContainerRef}
          >
            {currentPage && currentPage.map((page) => (
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

/**
  @param {Component} PageComponent
    The component that will render all the data for the page results on our currentPage
  @param {String} searchedTerm
    The searchedTerm if we're on the SearchPage
    When it changes, our container will run a fadeIn animation
  @param {ref} pageComponentContainerRef
    Used in the changePage scrollTransition.
    The element that uses this ref will be the element that we scroll to the top of when we change pages
  @param {pages[]} currentPage
    The current pagination page. It's an array of data for the pages that we want to render
  @param {[]} pageSelectorValues
    The possible values for the PageSelector
  @param {Number} pageNumber
    The current pageNumber we're on
  @param {Number} pagesCount
    The total number of pages
  @param {Function} changePage
    Function to change our Page
**/

export default PaginationStatic;
