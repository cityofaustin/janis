import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import ChevronRight from 'components/SVGs/ChevronRight';
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue';
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue';
import OfficialDocument from 'components/Pages/OfficialDocuments/OfficialDocument'

const OfficialDocumentPage = ({ officialDocuments }) => {

  const documentsPerPage = 5
  const maxPagesShown = 7
  const allDocs = officialDocuments.edges
  const [ pageNumber, setPageNumber ] = useState(0)
  const pages = buildPages()
  const page = pages[pageNumber]
  const pageRange = [ documentsPerPage * pageNumber, documentsPerPage * pageNumber+1 ]

  function buildPages() {
    const pages = []
    for (var i = 0; i < allDocs.length; i += documentsPerPage) {
      pages.push(allDocs.slice(i, i + documentsPerPage))
    }
    return pages
  }

  function changePage(newPage) {
    if (newPage >= 0 && newPage <= pages.length - 1) {
      setPageNumber(newPage)
    }
  }

  function topPageInRange() {
    let topLimit = documentsPerPage * (pageNumber+1)
    if (topLimit > allDocs.length) topLimit = allDocs.length
    return topLimit
  }

  const shownPages = [1, pages.length]
  function countPagesListed() {
    console.log('\n\n\n\n      ONLY IF 8 pages or more!')
    console.log("allDocs.length", allDocs.length)
    console.log("pages.length :", pages.length)
    console.log("pageNumber :", pageNumber)
    console.log("maxPagesShown :", maxPagesShown)
    // shownPages[maxPagesShown - 1] = pages.length
    // shownPages[pageNumber] = pageNumber + 1
    // check first behind
    // if (!shownPages[pageNumber - 1] && (pageNumber - 1) > 0) shownPages[pageNumber - 1] = pageNumber


    console.log("shownPages :", shownPages)
  }
  countPagesListed()

  return (
    <div>

    {/*
      <nav className="testy">
        1 | {pageNumber + 1}(current page) | {pages.length}(total pages) <br/>
        Documents Per Page: {documentsPerPage} <br/>
        Documents On this Page:
          { documentsPerPage * (pageNumber) }
          -
          { topPageInRange() }
        <br/>

        <button onClick={()=>changePage(pageNumber-1)}> [Previous] </button>
        ...
        <button onClick={()=>changePage(pageNumber+1)}> [Next] </button>
      </nav>
    */}

      <div className="coa-Page__all-of-the-content">
        <div className="wrapper container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-8">
              {page && page.map((document, index) => (
                <OfficialDocument document={document.node} key={index} />
              ))}
            </div>

            <hr/>

            <div className="coa-OfficialDocumentPage_pagination-container">

              <div onClick={()=>changePage(pageNumber-1)} className="coa-OfficialDocumentPage_page bookend">
                <ChevronLeftBlue className="coa-OfficialDocumentPage_page-chevron" />
                <div className="coa-OfficialDocumentPage_text">Previous</div>
              </div>

              {pages && pages.map((page, index) => (
                <PageNumber
                  pageNumber={pageNumber}
                  index={index}
                  changePage={changePage}
                  totalPages={pages.length}
                />
              ))}

              <div onClick={()=>changePage(pageNumber+1)} className="coa-OfficialDocumentPage_page">
                <div className="coa-OfficialDocumentPage_text right">Next</div>
                <ChevronRightBlue className="coa-OfficialDocumentPage_page-chevron right"/>
              </div>

            </div>


          </div>
        </div>

      </div>


    </div>
  )

}

const PageNumber = ({pageNumber, index, changePage, totalPages })=>{
  //
  //

  // const pagesRemaining = countPagesListed()
  // console.log("pagesRemaining :", pagesRemaining)
  //
  // let ellipsis = false
  // if (index === 0 ) {
  //   console.log("\nShow first", index + 1)
  // } else if ( (index + 1) === totalPages ) {
  //   console.log("show last", index + 1)
  // } else if (pageNumber === index) {
  //   console.log("Current page", index + 1)
  // } else if (pageNumber === index + 1) {
  //   console.log("SHOW page before current page: ", index + 1)
  // } else if (pageNumber === index - 1) {
  //   console.log("SHOW page after current page: ", index + 1)
  // } else {
  //   console.log("what to do with ...", index + 1)
  //   // ellipsis = true
  //   return ( <div className={ "coa-OfficialDocumentPage_page number " + active } > ... </div> )
  // }

  //
  //
  const active = pageNumber === index ? 'active' : ''
  return (
    <div
      onClick={()=>changePage(index)}
      className={ "coa-OfficialDocumentPage_page number " + active }
    >
      { index + 1 }
    </div>
  )
}

export default OfficialDocumentPage;
