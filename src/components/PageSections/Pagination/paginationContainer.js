import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { navigation as i18n2 } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPagination } from 'js/helpers/pagination.js';
import { queryObjectBuilder } from 'js/helpers/queryObjectBuilder';

import ChevronRight from 'components/SVGs/ChevronRight';
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue';
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue';
import OfficialDocument from 'components/Pages/OfficialDocuments/OfficialDocument';
import { PageNumber } from 'components/PageSections/Pagination';

const PaginationContainer = ({
  pagesArray,
  PageComponent,
  intl,
  fullWidthTablet = false,
  smallerBottomMargin = false,
}) => {
  const documentsPerPage = 10;
  const isMobile = useMobileQuery();
  const maxPagesMobile = 5;
  const maxPagesDesktop = 7;
  const maxPagesShown = isMobile ? maxPagesMobile : maxPagesDesktop;
  const pages = buildPages(pagesArray, documentsPerPage);
  const [pageNumber, setPageNumber] = useState(getPage());

  const shownPages = buildPagination(pages, maxPagesShown, pageNumber);
  const currentPage = pages[pageNumber];
  let domWindow; // this localized variable allows us to pass the DOM 'window' between methods without drawing errors on node js builds in react.

  useEffect(() => {
    domWindow = window;
    window.onpopstate = function(event) {
      const queryObject = queryObjectBuilder();
      if (pageNumber !== parseInt(queryObject.page) - 1) {
        setPageNumber(getPage());
      }
    };
    const hash = window.location.hash.split('&page=')[0];
    const p = pageNumber + 1;
    if (pages.length > 1) {
      window.location.hash = `${hash}&page=${pageNumber + 1}`;
    } else {
      window.location.hash = hash;
    }
  });

  function changePage(newPage) {
    if (newPage >= 0 && newPage <= pages.length - 1) {
      scrollTransition({
        scrollDuration: 0.3, // Scroll effect duration, regardless of height, in seconds
        fadeDelay: 0.3, // for both fade in & out. so 2x times value here for full transition.
        element: domWindow,
        fadeElement: paginationContainer,
        callback: () => {
          setPageNumber(newPage);
        }, // NOTE: callback will fire after fade OUT and BEFORE fade IN.
      });
    }
  }

  function getPage() {
    if (typeof window !== 'undefined' && window.location.hash.length > 1) {
      const queryObject = queryObjectBuilder();
      const page = parseInt(queryObject.page) || 0;
      return page;
    }
  }

  return (
    <div>
      <div id="paginationContainer" className="wrapper container-fluid">
        <div className="row">
          <div
            className={
              fullWidthTablet ? 'col-xs-12 col-lg-8' : 'col-xs-12 col-md-8'
            }
          >
            {currentPage &&
              currentPage.map((page, index) => (
                <PageComponent page={page} key={index} />
              ))}
          </div>

          {shownPages.length > 1 && (
            <div
              className={
                'coa-OfficialDocumentPage_pagination-container ' +
                (smallerBottomMargin
                  ? 'coa-OfficialDocumentPage_pagination-container--smaller-bottom-margin'
                  : '')
              }
            >
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
