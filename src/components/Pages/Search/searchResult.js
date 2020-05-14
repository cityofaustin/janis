import React from 'react';


const SearchResult = ({page, index}) => {

  if ( page.pageType === "event page" ) {
    return <EventPage page={page}></EventPage>
  } else {
    return <DefaultPage page={page}></DefaultPage>
  }

}


const DefaultPage = function({page}) {

  return (
    <div className="coa-search_result">

      <a href={page.janisUrls && page.janisUrls[0]}> {page.title} </a> <br />

      { page.summary && (
        <div className="coa-search_result-summary">
          {page.summary}
        </div>
      )}

      { (page.topics && page.topics.length > 0) && (
        <div className="coa-search_result-topics">
          Topic{page.topics.length > 1 ? "s: " : ": "}
          {page.topics.join(', ')}
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


const EventPage = function({page}) {

  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const formatedDate = page.date.split("-")
  const date = new Date(formatedDate[0],formatedDate[1],formatedDate[2])

  console.log("page:", page)

  let fees = ""
  if (page.fees === "eventIsFree" && !page.registrationUrl) {
    fees = "Event is free"
  } else if (page.fees === "eventIsFree" && page.registrationUrl) {
    fees = "Free • Registration required"
  } else {
    fees = "MORE STUFF TO DO"
  }


  console.log("page :", page)
  console.log("page.fees :", page.fees.edges)

  return (
    <div className="coa-search_result">
      <a href={page.janisUrls && page.janisUrls[0]}> {page.title} </a> <br />
      - - - <br />
      Event page TODO: Needs summery, price, weekday, event range.
      date: {page.date}<br />
      weekday: {daysOfWeek[date.getDay()]}<br />
      time: {page.startTime}<br />
      summery: {page.summary} <br />
      fees: {fees}
    </div>
  )

}


export default SearchResult
