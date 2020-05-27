import React, { useState, useEffect  } from 'react'
import { injectIntl } from 'react-intl'
import { navigation as i18n2 } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPagination } from 'js/helpers/pagination.js'
import { queryObjectBuilder } from 'js/helpers/queryObjectBuilder'

import ChevronRight from 'components/SVGs/ChevronRight'
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue'
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue'
import OfficialDocument from 'components/Pages/OfficialDocuments/OfficialDocument'
import { PageNumber } from 'components/PageSections/Pagination'

const PaginationContainer = ({ pagesArray, PageComponent, intl, searchedTerm }) => {

  const documentsPerPage = 10
  const isMobile = useMobileQuery()
  const maxPagesMobile = 5;
  const maxPagesDesktop = 7;
  const maxPagesShown = isMobile ? maxPagesMobile : maxPagesDesktop
  const pages = buildPages(pagesArray, documentsPerPage)
  const query = queryObjectBuilder()
  const [ isTransition, setIsTransition ] = useState(false)
  const [ pageNumber, setPageNumber ] = useState(0)
  const shownPages = buildPagination(pages, maxPagesShown, pageNumber)
  const currentPage = pages[pageNumber]

  let domWindow;
  useEffect(()=>{
    domWindow = window
    if (query.page && pageNumber !== parseInt(query.page) - 1 && isTransition === false) {
      setPageNumber(parseInt(query.page - 1))
    }
  })

  useEffect(()=>{
    if (query.page) {
      setPageNumber(parseInt(query.page)-1)
    } else {
      setPageNumber(0)
    }
  },[searchedTerm])

  const updatePage = (newPage)=>{
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.split('&page=')[0]
      window.location.hash = `${hash}&page=${parseInt(newPage)+1}`
      setPageNumber(newPage)// NOTE: hooks must be in the order
      setIsTransition(false)
    }
  }

  function changePage(newPage) {
    setIsTransition(true)
    if (newPage >= 0 && newPage <= pages.length - 1 && typeof window !== 'undefined') {
      scrollTransition({
        scrollDuration: 0.3, // Scroll effect duration, regardless of height, in seconds
        fadeDelay: 0.3, // for both fade in & out. so 2x times value here for full transition.
        element: domWindow,
        fadeElement: paginationContainerElm,
        callback:()=>{ updatePage(newPage) } // NOTE: callback will fire after fade OUT and BEFORE fade IN.
      })
    }
  }

  // const getPage = function(){
  //   if (typeof window !== 'undefined' && window.location.hash.length > 1) {
  //     const queryObject = queryObjectBuilder()
  //     const page = parseInt(queryObject.page) || 0
  //     return page
  //   }
  // }

  return (
    <div>
      <div id="paginationContainerElm" className="wrapper container-fluid">
        <div className="row">

          <div className="col-xs-12 col-md-8">
            {currentPage && currentPage.map((page, index) => (
              <PageComponent page={page} key={index} />
            ))}
          </div>

          {shownPages.length > 1 &&
            <div className="coa-OfficialDocumentPage_pagination-container">

              <div onClick={()=>changePage(pageNumber-1)} className="coa-OfficialDocumentPage_page previous">
                <ChevronLeftBlue className="coa-OfficialDocumentPage_page-chevron" />
              </div>

              {pages && shownPages.map((page, i) => (
                <PageNumber
                  pageNumber={pageNumber+1}
                  index={shownPages[i]}
                  paginationIndex={i}
                  key={i}
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
      </div>
    </div>
  )

}

export default PaginationContainer
