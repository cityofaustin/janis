import React from 'react';

import ChevronRight from 'components/SVGs/ChevronRight'
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue'
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue'
import { buildPages, buildPagination } from 'js/helpers/pagination.js'
import { PageNumber } from 'components/PageSections/Pagination'

export const PaginationContainer = (x) => {

  const pages = 12
  const pageNumber = 1
  const shownPages = buildPagination(pages, maxPagesShown, pageNumber)

  const changePage = function(newPage) {
    if (newPage >= 0 && newPage <= pages.length - 1) {
      scrollTransition({
        scrollDuration: 0.75, // Scroll effect duration, regardless of height, in seconds
        fadeDelay: 0.3, // for both fade in & out. so 2x times value here for full transition.
        element: domWindow,
        fadeElement: officialDocumentsPage,
        callback:()=>{ setPageNumber(newPage) } // NOTE: callback will fire after fade OUT and BEFORE fade IN.
      })
    }
  }

  return (
    <div>
      <h1>...Pagiation Container Here...</h1>
      {pages > 1 &&
        <div className="coa-OfficialDocumentPage_pagination-container">

          <div onClick={()=>changePage(pageNumber-1)} className="coa-OfficialDocumentPage_page previous">
            <ChevronLeftBlue className="coa-OfficialDocumentPage_page-chevron" />
          </div>

          {pages && shownPages.map((page, i) => (
            <PageNumber
              pageNumber={pageNumber+1}
              index={shownPages[i]}
              paginationIndex={i}
              pageNumberIndex={shownPages.indexOf(pageNumber+1)}
              changePage={changePage}
              contentType={"OfficialDocumentPage"}
            />
          ))}

          <div onClick={()=>changePage(pageNumber+1)} className="coa-OfficialDocumentPage_page next">
            <ChevronRightBlue className="coa-OfficialDocumentPage_page-chevron right"/>
          </div>
        </div>
      }
    </div>

  )
}
