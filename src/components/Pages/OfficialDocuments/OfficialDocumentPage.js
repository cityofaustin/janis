import React, { useState, useEffect  } from 'react'
import { injectIntl } from 'react-intl'
import { navigation as i18n2 } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPagination } from 'js/helpers/pagination.js'

import ChevronRight from 'components/SVGs/ChevronRight'
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue'
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue'
import OfficialDocument from 'components/Pages/OfficialDocuments/OfficialDocument'
import UserFeedback from 'components/UserFeedback';
import { PageNumber } from 'components/PageSections/Pagination'

const OfficialDocumentPage = ({ officialDocuments, intl }) => {

  const documentsPerPage = 10
  const isMobile = useMobileQuery()
  const maxPagesMobile = 5;
  const maxPagesDesktop = 7;
  const maxPagesShown = isMobile ? maxPagesMobile : maxPagesDesktop
  const pages = buildPages(officialDocuments.edges, documentsPerPage)
  const [ pageNumber, setPageNumber ] = useState(getHash())
  const shownPages = buildPagination(pages, maxPagesShown, pageNumber)
  const page = pages[pageNumber]
  let domWindow // this localized variable allows us to pass the DOM 'window' between methods without drawing errors on node js builds in react.

  useEffect(() => {
    domWindow = window
    window.onpopstate = function(event) {
      setPageNumber(getHash())
    }
    window.location.hash = pageNumber+1
  })

  function changePage(newPage) {
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

  function getHash(){
    const str = typeof window !== 'undefined' ? window.location.hash.split("#")[1] : 0
    const hash = (str > 0 && str <= pages.length) ? parseInt(str)-1 : 0
    return hash
  }

  return (
    <div>
      <div id="officialDocumentsPage" className="wrapper container-fluid">
        <div className="row">

          <div className="col-xs-12 col-md-8">
            {page && page.map((document, index) => (
              <OfficialDocument document={document.node} key={index} />
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
        <UserFeedback />
      </div>
    </div>
  )

}

export default OfficialDocumentPage
