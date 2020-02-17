import React, { useState, useEffect  } from 'react'
import { injectIntl } from 'react-intl'
import { navigation as i18n2 } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';

import ChevronRight from 'components/SVGs/ChevronRight'
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue'
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue'
import EventListEntry from 'components/Pages/EventList/EventListEntry';

const EventListPagination = ({ events, intl }) => {
  const eventsPerPage = 2
  const isMobile = useMobileQuery()
  const maxPagesMobile = 5;
  const maxPagesDesktop = 7;
  const maxPagesShown = isMobile ? maxPagesMobile : maxPagesDesktop
  const allEvents = events
  const pages = buildPages()
  const [ pageNumber, setPageNumber ] = useState(getHash())
  const shownPages = buildPagination()
  const page = pages[pageNumber]
  let domWindow // this localized variable allows us to pass the DOM 'window' between methods without drawing errors on node js builds in react.

  console.log(events)
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
        fadeElement: EventListsPage,
        callback:()=>{ setPageNumber(newPage) } // NOTE: callback will fire after fade OUT and BEFORE fade IN.
      })
    }
  }

  function getHash(){
    const str = typeof window !== 'undefined' ? window.location.hash.split("#")[1] : 0
    const hash = (str > 0 && str <= pages.length) ? parseInt(str)-1 : 0
    return hash
  }

  function buildPages() {
    const pages = []
    for (var i = 0; i < allEvents.length; i += eventsPerPage) {
      pages.push(allEvents.slice(i, i + eventsPerPage))
    }
    return pages
  }

  function buildPagination() {

    if (pages.length < 2) return []
    let shownPages = [pageNumber+1]

    for (var i = 1; i < maxPagesShown; i++) {
      // Add the next page # and/or the previous page # if page exists
      if (pageNumber + i <= pages.length - 1) shownPages.push(pageNumber + i + 1)
      if (pageNumber + (i*-1) >= 0) shownPages.unshift(pageNumber + (i*-1) + 1)
      // If all slots are filled, break loop.
      if (shownPages.length >= maxPagesShown) break
    }

    // replace first and last pageNumber in list with ellipsis if there is more than 1 page in either direction...
    if (shownPages[0] > 1) shownPages[0] = "..."
    if (shownPages[shownPages.length -1] < pages.length) shownPages[shownPages.length -1] = "..."

    return shownPages
  }

  return (
    <div>
      <div id="EventListsPage" className="wrapper container-fluid">
        <div className="row">

          <div className="col-xs-12 col-md-8">
            {page && page.map((event, index) => (
              <EventListEntry event={event} key={index} />
            ))}
          </div>

          {shownPages.length > 1 &&
            <div className="coa-EventListPage_pagination-container">

              <div onClick={()=>changePage(pageNumber-1)} className="coa-EventListPage_page previous">
                <ChevronLeftBlue className="coa-EventListPage_page-chevron" />
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

              <div onClick={()=>changePage(pageNumber+1)} className="coa-EventListPage_page next">
                <ChevronRightBlue className="coa-EventListPage_page-chevron right"/>
              </div>

            </div>
          }

        </div>
      </div>
    </div>
  )

}

// move this one and the other one from documents into its own component and import
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
      className={ "coa-EventListPage_page number-container" + active + ellipsis }
    >
      <div className={ "coa-EventListPage_number" }>
        { index }
      </div>
    </div>
  )
}

export default EventListPagination
