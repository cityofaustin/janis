import React, { useState, useEffect, useRef } from 'react';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPageSelectorValues } from 'js/helpers/pagination.js';
import { queryObjectBuilder, queryStringBuilder } from 'js/helpers/queryObjectBuilder';

import Filter from 'components/PageSections/Pagination/Filter';
import PageSelector from 'components/PageSections/Pagination/PageSelector';

const PaginationContainer = ({
  pagesArray,
  PageComponent,
  filterable=false,
  searchedTerm=null,
}) => {
  const documentsPerPage = 10;
  const isMobile = useMobileQuery();
  const maxPagesMobile = 5;
  const maxPagesDesktop = 7;
  const maxPagesShown = isMobile ? maxPagesMobile : maxPagesDesktop;
  const pages = buildPages(pagesArray, documentsPerPage);
  let query = queryObjectBuilder();
  const [isTransition, setIsTransition] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const pageComponentsRef = useRef();
  const pageSelectorValues = buildPageSelectorValues(pages, maxPagesShown, pageNumber);
  const currentPage = pages[pageNumber];

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

  const applyFilter = () => {
    // TODO: change the pageArray that gets rendered, based on the filter parameters
  }

  // TODO: date boundaries should be set by earliest and latest official documents in collection
  const lowerBound = new Date(2018, 1, 1)
  const upperBound = new Date()

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

  return (
    <div className="wrapper container-fluid">
      <div className="row">
        {filterable && (
          <Filter
            applyFilter={applyFilter}
            lowerBound={lowerBound}
            upperBound={upperBound}
          />
        )}
        <div className="col-xs-12 col-lg-8">
          <div>
            50 Filtered results {/** TODO: this component needs to get conencted to actual filter state **/}
          </div>
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
