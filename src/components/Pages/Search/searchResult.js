import React from 'react';
import { useIntl } from 'react-intl';
import { date as i18n } from 'js/i18n/definitions';

import EventListEntry from 'components/Pages/EventList/EventListEntry';



const SearchResult = ({page, index}) => {

  const intl = useIntl();

  if ( page.pageType === "event page" ) {
    return <EventPage page={page} intl={intl}></EventPage>
  } else {
    return <DefaultPage page={page} intl={intl}></DefaultPage>
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
        <div>
          Location page! > TODO: Need address
        </div>
      )}

      { page.pageType === "topic collection page" && (
        <div> 📭NO META DATA FOR: topic collection page </div>
      )}

      { page.pageType === "topic page" && (
        <div> 📭NO META DATA FOR: topic page </div>
      )}

    </div>
  )

}


const EventPage = function({page, intl}) {

  // const daysOfWeek_en = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  // const daysOfWeek_es = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
  // const monthsOfYear_en = [ "January", "February","March","April","May","June","July","August","September","October","November","December"]
  // const spanishFullMonths_es = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]

  // const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  //
  // const formatedDate = page.date.split("-")
  // const date = new Date(formatedDate[0],formatedDate[1],formatedDate[2])
  //
  //
  // let fees = ""
  // if (page.fees === "eventIsFree" && !page.registrationUrl) {
  //   fees = "Event is free"
  // } else if (page.fees === "eventIsFree" && page.registrationUrl) {
  //   fees = "Free • Registration required"
  // } else {
  //   fees = "MORE STUFF TO DO"
  // }

  // page.isSearchResult = true
  page.location = page.locations[0] // Add in BUild??? might only
  page.eventUrl = page.janisUrls[0] // Add in BUild???
  if (!page.registrationUrl) {
    page.registrationUrl = []
  }
  // if (page.feesRange && page.feesRange.length > 0) {
  //   // const fees = page.feesRange.map(fee=>"$"+fee.fee)
  //   const fees = []
  //   for (var i = 0; i < page.feesRange.length; i++) {
  //     fees.push("$"+page.feesRange[i].fee)
  //   }
  //   page.feesRange = fees.join('-')
  // }

  return ( <EventListEntry event={page} isSearchResult /> )

}

  // <a href={page.janisUrls && page.janisUrls[0]}> {page.title} </a> <br />
  // - - - <br />
  // Event page TODO: Needs summery, price, weekday, event range.
  // date: {page.date}<br />
  // weekday: {daysOfWeek[date.getDay()]}<br />
  // time: {page.startTime}<br />
  // summery: {page.summary} <br />
  // fees: {fees}




export default SearchResult
