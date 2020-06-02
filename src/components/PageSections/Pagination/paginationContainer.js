import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { navigation as i18n2 } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPagination } from 'js/helpers/pagination.js';
import { queryObjectBuilder, queryStringBuilder } from 'js/helpers/queryObjectBuilder';

import ChevronRight from 'components/SVGs/ChevronRight';
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue';
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue';
import OfficialDocument from 'components/Pages/OfficialDocuments/OfficialDocument';
import { PageNumber } from 'components/PageSections/Pagination';

const PaginationContainer = ({
  pagesArray,
  PageComponent,
  intl,
  searchedTerm,
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
  const shownPages = buildPagination(pages, maxPagesShown, pageNumber);
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
        fadeElement: paginationContainerElm,
        callback: () => {
          updatePage(newPage);
        }, // NOTE: callback will fire after fade OUT and BEFORE fade IN.
      });
    }
  }

  return (
    <div>
      <div id="paginationContainerElm" className="wrapper container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            {currentPage &&
              currentPage.map((page, index) => (
                <PageComponent page={page} key={index} />
              ))}
          </div>

          {shownPages.length > 1 && (
            <div className="coa-OfficialDocumentPage_pagination-container">
              <div
                onClick={() => changePage(pageNumber - 1)}
                className="coa-OfficialDocumentPage_page previous"
              >
                <ChevronLeftBlue className="coa-OfficialDocumentPage_page-chevron" />
              </div>

              {pages &&
                shownPages.map((page, i) => (
                  <PageNumber
                    pageNumber={pageNumber + 1}
                    index={shownPages[i]}
                    paginationIndex={i}
                    key={i}
                    pageNumberIndex={shownPages.indexOf(pageNumber + 1)}
                    changePage={changePage}
                    contentType={'OfficialDocumentPage'}
                  />
                ))}

              <div
                onClick={() => changePage(pageNumber + 1)}
                className="coa-OfficialDocumentPage_page next"
              >
                <ChevronRightBlue className="coa-OfficialDocumentPage_page-chevron right" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginationContainer;
