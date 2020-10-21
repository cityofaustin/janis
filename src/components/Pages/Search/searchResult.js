import React from 'react';
import moment from 'moment-timezone';

import EventListEntry from 'components/Pages/EventList/EventListEntry';
import HtmlFromRichText from 'components/HtmlFromRichText';

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
    searchSummary,
    topics,
    pageType,
    url,
  } = page
  return (
    <div className="coa-search_result">
      <a
        className="coa-search_result-title"
        href={url}
      >
        {title}
      </a>
      { searchSummary && (
        <div className="coa-search_result-text">
          {searchSummary}
        </div>
      )}
      { (topics && topics.length > 0) && (
        <div className="coa-search_result-topics">
          Topic{topics.length > 1 ? "s: " : ": "}
          {topics.map(t=>t.title).join(", ")}
        </div>
      )}
    </div>
  )
}


const OfficialDocumentPage = function({ page }) {
  const {
    url,
    title,
    date,
    searchSummary,
    authoringOffice,
    officialDocumentCollections,
    filename,
    pdfSize,
  } = page
  return (
    <div className="coa-search_result">

      <a
        className="coa-search_result-title"
        href={url}
      >
        {title} {date}
      </a>

      <div className="coa-search_result-text">
        <HtmlFromRichText content={searchSummary} />
      </div>

      <div className="coa-search_result-topics">
        <a
          className="coa-search_result-pdf"
          href={"https://joplin3-austin-gov-static.s3.amazonaws.com/production/media/documents/"+filename}
        >
          {filename}
        </a>
        <span className="coa-search_result-pdf-size">
          {/*
            The file size is originally in bytes. The math here will
            round the file size to the nearest decimal of a MB.
          */}
          &nbsp;(PDF {Math.round(pdfSize/100000)/10}mb)
        </span>
      </div>

      <div className="coa-search_result-topics from">
        From: {authoringOffice}
      </div>

      <div className="coa-search_result-topics">
        Part of:&nbsp;
        <a
          className="coa-search_result-pdf"
          href={"/"+officialDocumentCollections[0].url}
        >
          {officialDocumentCollections[0].title}
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
    url
  } = page

  return (
    <div className="coa-search_result coa-search_result-locations">

      <div className="coa-search_result-icon-container">
        <i className="material-icons coa-LocationPage__header-icon">place</i>
      </div>

      <div>
        <a
          className="coa-search_result-title"
          href={url}
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
