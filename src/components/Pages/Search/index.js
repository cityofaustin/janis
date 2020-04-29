import React, { useState, use  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import { buildPages, buildPagination } from 'js/helpers/pagination.js'

// ...Make this a js/helpers function
// 🔥It'll be easy and worth it!
const searchWorker = function(currentResults, searchString) {

  const priortizeFirstChar = []

  if (searchString) {

    const filteredSearch = currentResults.filter( result => {

      // Make search term and querys all lowercase
      const ltitle = result.node.title.toLocaleLowerCase()
      const lsearch = searchString+"".toLocaleLowerCase()

      // 🚨Bob. better notes here... Prioritize alphabatize by
      if (lsearch[0] === ltitle[0] && ltitle.includes(lsearch)) {
        priortizeFirstChar.push(result)
      } else {
        return ltitle.includes(lsearch)
      }

    })

    return priortizeFirstChar.concat(filteredSearch)

  } else {
    return currentResults
  }
  
}

const SearchPage = () => {

  const intl = useIntl();
  const { searchIndex } = useRouteData();
  const title = "Search" // ⚠️useIntl
  let uri_dec = decodeURIComponent(window.location.search).split('?')[1];
  // let [ searchString, setSearchString ] = useState(uri_dec)
  let searchString = uri_dec

  // Don't show pages without Url
  const searchIndexWithUrl = searchIndex.edges.filter( page => page.node.janisUrls.length > 0)
  const filteredSearch = searchWorker(searchIndexWithUrl, searchString)

  let [ searchResults, setSearchResults ] = useState(filteredSearch)
  // let searchResults = searchIndexWithUrl


  // useEffect((x) => {
  //   console.log('useEffect, x', x)
  //   // searchWorker()
  //   searchPageInputId.focus()
  // })

  const searchButtonPressed = function(x) {
    // window.location.search = searchString
    window.location.search = searchPageInputId.value
  }

  const searchKeyInput = function(event) {
    console.log('click')
    // setSearchString(event.target.value, 'ok') // 🔥x
    // searchString = event.target.value
    // const filtered = searchWorker(searchResults)
  }

  // searchWorker()

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <PageHeader> {title} </PageHeader>

      <div>
        <input
          className="coa-searchPage_input"
          id="searchPageInputId"
          placeholder="..."
          onChange={()=>searchKeyInput(event)}
        />

        <button
          className="coa-searchPage_search-button"
          onClick={()=>searchButtonPressed('click')}
        >
          Search
        </button>
      </div>

      <div> &nbsp; {searchResults && searchResults.length} Results </div>

      { searchResults && searchResults.map( (page, i) => (
        <div key={i} style={{paddingLeft: 20 }}>
          <hr />

          Page Title : {page.node.title}

          <div> &nbsp; &bull; &nbsp;
            <span style={{fontSize: 16}}>
              {page.node.pageType}
            </span>
          </div>

          <div>
            <span style={{fontSize: 16}}>  &nbsp; Url: &nbsp;</span>
            <a style={{fontSize: 14}} href={page.node.janisUrls}>
              {window.location.origin+page.node.janisUrls[0]}
            </a>
          </div>

          {page.node.summery &&
            <div>
              <p style={{fontSize: 14}}>
                {page.node.summery}
              </p>
            </div>
          }

        </div>
      )) }

    </div>
  )
}


export default SearchPage
