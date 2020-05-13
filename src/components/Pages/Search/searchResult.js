import React from 'react';

const SearchResult = ({page, index}) => {

  console.log("page.title, page.topics :", page.title, page.topics, page.pageType)
  // if (page.pageType === "department page") {
  //   console.log("page :", page)
  // }

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

      { page.pageType === "event page" && (
        <div>
          Event page TODO: Needs summery, price, weekday, event range.
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

  // Content Type: {page.pageType}
  // topic{plural}:{page.topics.join(",")}



}

export default SearchResult
