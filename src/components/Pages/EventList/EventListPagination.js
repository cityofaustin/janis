import React, { useState, useEffect  } from 'react'
import { injectIntl } from 'react-intl'
import { navigation as i18n2 } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPagination } from 'js/helpers/pagination.js'

import ChevronRight from 'components/SVGs/ChevronRight'
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue'
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue'
import EventListEntry from 'components/Pages/EventList/EventListEntry';
import { PageNumber } from 'components/PageSections/Pagination'

const EventListPagination = ({ events, intl }) => {
  const eventsPerPage = 2
  const isMobile = useMobileQuery()
  const maxPagesMobile = 5;
  const maxPagesDesktop = 7;
  const maxPagesShown = isMobile ? maxPagesMobile : maxPagesDesktop
  const pages = buildPages(events, eventsPerPage)
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
                  contentType={"EventListPage"}
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

export default EventListPagination
