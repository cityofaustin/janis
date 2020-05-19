import React from 'react';
import { useIntl } from 'react-intl';
import { date as i18n } from 'js/i18n/definitions';

import EventListEntry from 'components/Pages/EventList/EventListEntry';

const SearchResult = ({page, index}) => {

  const intl = useIntl();

  if ( page.pageType === "event page" ) {
    return <EventPage page={page} intl={intl}/>
  } else if ( page.pageType === "location page" ) {
    return <LocationPage page={page} intl={intl}/>
  } else if ( page.pageType === "official document page document") {
    return <OfficialDocumentPageDocument page={page} intl={intl}/>
  } else {
    return <DefaultPage page={page} intl={intl}/>
  }

}


const DefaultPage = function({ page, intl }) {
  const {
    title,
    summary,
    topics,
    pageType,
    janisUrls
  } = page

  return (
    <div className="coa-search_result">

      <a href={page.janisUrls && page.janisUrls[0]}> {title} </a> <br />

      { page.summary && (
        <div className="coa-search_result-summary">
          {page.summary}
        </div>
      )}

      { (page.topics && page.topics.length > 0) && (
        <div className="coa-search_result-topics">
          Topic{page.topics.length > 1 ? "s: " : ": "}
          {page.topics.join(", ")}
        </div>
      )}

      { page.pageType === "location page" && (
        <div className="coa-search_result-summary">
          <i className="material-icons coa-LocationPage__header-icon">place</i>
          {page.physicalStreet+" #"+page.physicalUnit}
        </div>
      )}

    </div>
  )

}

const OfficialDocumentPageDocument = function({page, intl}) {

  return (
    <div className="coa-search_result">

      <div className="coa-search_result-summary">
        {page.date}
      </div>
      <div className="coa-search_result-title">
        {page.title}
      </div>
      <div className="coa-search_result-summary">
        {page.summary}
      </div>
      <div className="coa-search_result-topics">
        Document:
        <a
          style={{
            fontSize: "18px",
            paddingTop: "10px;"
          }}
          href={"https://joplin3-austin-gov-static.s3.amazonaws.com/production/media/documents/"+page.document[0].filename}
        >
          &nbsp; {page.document[0].filename}
        </a>
      </div>
    </div>

  )
}

const LocationPage = function({page, intl}) {
  const {
    title,
    physicalStreet,
    physicalUnit,
    physicalCity,
    physicalState,
    physicalZip,
    janisUrls
  } = page

  return (
    <div className="coa-search_result coa-search_result-locations">
      <div style={{display: "inline-block", backgroundColor: '#F7F9FA', width: '88px', textAlign: 'center', paddingTop: 30, marginRight: 20, borderRadius: 4}}>
        <i className="material-icons coa-LocationPage__header-icon">place</i>
      </div>
      <div style={{display: "inline-block"}}>
        <a href={janisUrls && janisUrls[0]}> {title} </a> <br />
        {physicalStreet}
        {physicalUnit && (" #"+physicalUnit)}
        <br />
        {physicalCity},
        {physicalState}
        {physicalZip}
      </div>
    </div>
  )
}


const EventPage = function({page, intl}) {

  page.location = page.locations[0] // Add in BUild??? might only
  page.eventUrl = page.janisUrls[0] // Add in BUild???
  if (!page.registrationUrl) {
    page.registrationUrl = []
  }

  return (
    <div className="coa-search_result">
      <EventListEntry event={page} isSearchResult />
    </div>
  )

}


export default SearchResult
