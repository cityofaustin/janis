import React from 'react';

const SearchResult = ({page, index}) => {

  return (
    <div>
      <hr />
      Title: {page.node.title} <br />
      Urls: {page.node.janisUrls} <br />
      Summery: {page.node.summery} <br />
      Content Type: {page.node.pageType}
    </div>
  )

}

export default SearchResult
