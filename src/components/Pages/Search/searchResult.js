import React from 'react';

const SearchResult = ({page, index}) => {

  return (
    <div>
      <hr />
      Title: {page.title} <br />
      <a href={page.janisUrls && page.janisUrls[0]}> Internal Page Link </a> <br />
      Summery: {page.summery} <br />
      Content Type: {page.pageType}
    </div>
  )

}

export default SearchResult
