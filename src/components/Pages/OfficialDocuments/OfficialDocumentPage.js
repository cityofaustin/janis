import React, { useState, useEffect  } from 'react'
import { injectIntl } from 'react-intl'
import { navigation as i18n2 } from 'js/i18n/definitions';
import { isMobileQuery } from 'js/helpers/reactMediaQueries.js';

import ChevronRight from 'components/SVGs/ChevronRight'
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue'
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue'
import OfficialDocument from 'components/Pages/OfficialDocuments/OfficialDocument'

const OfficialDocumentPage = ({ officialDocuments, intl }) => {

  const documentsPerPage = 10
  const isMobile = isMobileQuery()
  const maxPagesShown = isMobile ? 4 : 7 // Desktop : Mobile (pagination pages shown)
  const allDocs = officialDocuments.edges
  const pages = buildPages()
  const [ pageNumber, setPageNumber ] = useState(getHash())
  const shownPages = buildPagination()
  const page = pages[pageNumber]

  useEffect(() => {
    const str = typeof window !== 'undefined' ? window.location.hash.split("#")[1] : 0
    const hash = (str > 0 && str <= pages.length) ? parseInt(str)-1 : 0
    setPageNumber(hash)
  })

  useEffect(() => {
    window.onpopstate = function(event) {
      setPageNumber(getHash())
      window.requestAnimationFrame( ()=> window.scroll(0,0) )
    }
    window.location.hash = pageNumber+1
  })

  function getHash(){
    const str = typeof window !== 'undefined' ? window.location.hash.split("#")[1] : 0
    const hash = (str > 0 && str <= pages.length) ? parseInt(str)-1 : 0
    return hash
  }

  function buildPages() {
    const pages = []
    for (var i = 0; i < allDocs.length; i += documentsPerPage) {
      pages.push(allDocs.slice(i, i + documentsPerPage))
    }
    return pages
  }

  function buildPagination() {
    if (pages.length < 2) return []
    let shownPages = [1, pages.length]
    let range = 2

    // add current page if not first or last page.
    if (!shownPages.includes(pageNumber+1)) {
      shownPages.splice(1,0,pageNumber+1)
    }

    // add ellipsis for gaps greater than 1
    if (pages.length >= maxPagesShown) {
      for (var i = 0; i < maxPagesShown; i++) {
        if (shownPages[i+1] - shownPages[i] == 2 && shownPages.length < maxPagesShown) {
          shownPages.splice(i+1,0,shownPages[i]+1)
        } else if (shownPages[i+1] - shownPages[i] > 2 && shownPages.length < maxPagesShown) {
          shownPages.splice(i+1,0,"...")
        }
      }
    }

    // fill pages arround current page if available. Prioritizing Page Forward.
    while (range+1 < maxPagesShown) {
      shownPages = addPages(range, shownPages)
      range++
    }

    // Replace any elipsis that now actually just represent ONE number. "Thanks elipsis! But, you're not needed anymore."
    // Also, if the ellipsis is plus-or-minus 1 to the current page, let's show acutal page number too.
    shownPages.map((num,i)=>{
      const diff = i - shownPages.indexOf(pageNumber+1)
      if (typeof num === "string" && shownPages[i+1] - shownPages[i-1] === 2) {
        shownPages[i] = shownPages[i+1] - 1
      } else if (typeof num === "string" && Math.abs(diff) === 1) {
        shownPages[i] = pageNumber + 1 + diff
      }
    })

    return shownPages
  }

  function addPages(range, shownPages) {
    const pageIndex = shownPages.indexOf(pageNumber+1)
    const pageForward = pageNumber+range
    const pageBack = pageNumber-(range-2)
    if (
      !shownPages.includes(pageForward)
      && pageForward < shownPages[shownPages.length - 1]
      && maxPagesShown > shownPages.length
    ) {
      shownPages.splice(pageNumber === 0 ? range-1 : pageIndex+range-1, 0, pageForward)
    }
    if (
      !shownPages.includes(pageBack)
      && pageBack > 1
      && maxPagesShown > shownPages.length
    ) {
      shownPages.splice(pageIndex+2-range, 0, pageBack)
    }
    return shownPages
  }

  function changePage(newPage) {
    if (newPage >= 0 && newPage <= pages.length - 1) {
      setPageNumber(newPage)
    }
  }

  return (
    <div>
      <div className="wrapper container-fluid">
        <div className="row">

          <div className="col-xs-12 col-md-8">
            {page && page.map((document, index) => (
              <OfficialDocument document={document.node} key={index} />
            ))}
          </div>

          {shownPages.length > 1 &&
            <div className="coa-OfficialDocumentPage_pagination-container">

              <div onClick={()=>changePage(pageNumber-1)} className="coa-OfficialDocumentPage_page bookend">
                <ChevronLeftBlue className="coa-OfficialDocumentPage_page-chevron" />
                { !isMobile &&
                  <div className="coa-OfficialDocumentPage_text">
                    {intl.formatMessage(i18n2.previous)}
                  </div>
                }
              </div>

              {pages && shownPages.map((page, i) => (
                <PageNumber
                  pageNumber={pageNumber+1}
                  index={shownPages[i]}
                  paginationIndex={i}
                  pageNumberIndex={shownPages.indexOf(pageNumber+1)}
                  changePage={changePage}
                />
              ))}

              <div onClick={()=>changePage(pageNumber+1)} className="coa-OfficialDocumentPage_page">
                { !isMobile &&
                  <div className="coa-OfficialDocumentPage_text right">
                    {intl.formatMessage(i18n2.next)}
                  </div>
                }
                <ChevronRightBlue className="coa-OfficialDocumentPage_page-chevron right"/>
              </div>

            </div>
          }

        </div>
      </div>
    </div>
  )

}

const PageNumber = ({ pageNumber, index, changePage, paginationIndex, pageNumberIndex })=>{
  const active = pageNumber === index ? " active" : ''
  let ellipsis = ""
  let pageIndex = index
  if (index === "...") {
    ellipsis = " ellipsis"
    pageIndex = pageNumberIndex > paginationIndex ? pageNumber-1 : pageNumber+1
  }
  return (
    <div
      onClick={()=>changePage(pageIndex-1)}
      className={ "coa-OfficialDocumentPage_page number-container" + active + ellipsis }
    >
      <div className={ "coa-OfficialDocumentPage_number" }>
        { index }
      </div>
    </div>
  )
}

export default OfficialDocumentPage
