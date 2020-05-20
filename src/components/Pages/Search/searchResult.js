import React from 'react';
import moment from 'moment-timezone';

import EventListEntry from 'components/Pages/EventList/EventListEntry';


const SearchResult = ({ page }) => {

  if ( page.pageType === "event page" ) {
    return <EventPage page={page}/>
  } else if ( page.pageType === "location page" ) {
    return <LocationPage page={page}/>
  } else if ( page.pageType === "official document page document") {
    return <OfficialDocumentPageDocument page={page}/>
  } else {
    return <DefaultPage page={page}/>
  }

}


const DefaultPage = function({ page }) {
  const {
    title,
    summary,
    topics,
    pageType,
    janisUrls
  } = page

  return (
    <div className="coa-search_result">

      <a href={janisUrls && janisUrls[0]}> {title} </a> <br />

      { summary && (
        <div className="coa-search_result-text">
          {summary}
        </div>
      )}

      { (topics && topics.length > 0) && (
        <div className="coa-search_result-topics">
          Topic{topics.length > 1 ? "s: " : ": "}
          {topics.join(", ")}
        </div>
      )}

    </div>
  )

}


const OfficialDocumentPageDocument = function({ page }) {
  const {
    title,
    date,
    summary,
    startTime,
    document,
    topics,
  } = page

  return (
    <div className="coa-search_result">

      <div className="coa-search_result-text">
        {date}
      </div>
      <div className="coa-search_result-title">
        {title}
      </div>
      <div className="coa-search_result-text">
        {summary}
      </div>
      <div className="coa-search_result-topics">
        Document:
        <a href={"https://joplin3-austin-gov-static.s3.amazonaws.com/production/media/documents/"+document[0].filename}>
          &nbsp; {document[0].filename}
        </a>
      </div>
      { (topics && topics.length > 0) && (
        <div className="coa-search_result-topics">
          Topic{topics.length > 1 ? "s: " : ": "}
          {topics.join(", ")}
        </div>
      )}
    </div>

  )
}


const LocationPage = function({ page }) {
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
      <div className="coa-search_result-icon-container">
        <i className="material-icons coa-LocationPage__header-icon">place</i>
      </div>
      <div>
        <a href={janisUrls && janisUrls[0]}> {title} </a>
        <br />
        <div className="coa-search_result-text coa-search_results-address">
          {physicalStreet}{physicalUnit && (" #"+physicalUnit)}
          <br />
          {physicalCity}, {physicalState} {physicalZip}
        </div>
      </div>
    </div>
  )
}


const EventPage = function({ page }) {

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
