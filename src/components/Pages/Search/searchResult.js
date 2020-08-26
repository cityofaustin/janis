import React from 'react';
import moment from 'moment-timezone';

import EventListEntry from 'components/Pages/EventList/EventListEntry';


const SearchResult = ({ page }) => {

  if ( page.pageType === "event page" ) {
    return <EventPageResult page={page}/>
  } else if ( page.pageType === "location page" ) {
    return <LocationPageResult page={page}/>
  } else if ( page.pageType === "official document page") {
    return <OfficialDocumentPage page={page}/>
  } else {
    return <DefaultPageResult page={page}/>
  }

}


const DefaultPageResult = function({ page }) {
  const {
    title,
    summary,
    topics,
    pageType,
    janisUrls
  } = page

  return (
    <div className="coa-search_result">

      <a
        className="coa-search_result-title"
        href={janisUrls && janisUrls[0]}
      >
        {title}
      </a>

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


const OfficialDocumentPage = function({ page }) {

  console.log("page :", page)
  const {
    janisUrls,
    title,
    date,
    summary,
    document,
    topics,
  } = page

  return (
    <div className="coa-search_result">

      <a
        className="coa-search_result-title"
        href={janisUrls && janisUrls[0]}
      >
        {title} {date}
      </a>

      <div className="coa-search_result-text">
        {summary}
      </div>

      <div className="coa-search_result-topics">
        <a
          className="coa-search_result-pdf"
          href={"https://joplin3-austin-gov-static.s3.amazonaws.com/production/media/documents/"+document.filename}
        >
          {document.filename}
        </a>
        <span className="coa-search_result-pdf-size">
          &nbsp;(PDF {Math.round(document.fileSize/100000)/10}mb)
        </span>
      </div>

      <div className="coa-search_result-topics from">
        From: {page.authoringOffice}
      </div>

      <div className="coa-search_result-topics">
        Part of:&nbsp;
        <a
          className="coa-search_result-pdf"
          href={"/"+page.partOf.departments[0].slug+"/"+page.partOf.slug}
        >
          {page.partOf.title}
        </a>
      </div>

    </div>
  )
}


const LocationPageResult = function({ page }) {
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
        <a
          className="coa-search_result-title"
          href={janisUrls && janisUrls[0]}
        >
          {title}
        </a>
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


const EventPageResult = function({ page }) {

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
