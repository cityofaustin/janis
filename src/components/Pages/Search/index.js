import React, { useState, useEffect  } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import { buildPages, buildPagination } from 'js/helpers/pagination.js'

const SearchPage = () => {

  const intl = useIntl();
  const { searchIndex } = useRouteData();

  // Don't show pages without Url
  const searchIndexWithUrl = searchIndex.edges.filter( page => page.node.janisUrls.length > 0)
  console.log("searchIndexWithUrl :", searchIndexWithUrl)

  let [ searchResults, setSearchResults ] = useState(searchIndexWithUrl)
  const title = "Search" // ⚠️useIntl
  let uri_dec = decodeURIComponent(window.location.search).split('?')[1];
  let [ searchString, setSearchString ] = useState(uri_dec)

  useEffect((x) => {
    console.log('useEffect, x', x)
    // searchWorker()
  })

  console.log("searchResults :", searchResults)

  const searchButtonPressed = function(x) {
    window.location.search = searchString
  }

  const searchKeyInput = function(event) {
    setSearchString(event.target.value, 'ok')
  }

  // Make this a js/helpers function
  const searchWorker = function() {
    let filteredSearch = [...searchResults]
    const priortizeFirstChar = []
    if (searchString) {
      // const searchSubString = searchString+""

      filteredSearch = filteredSearch.filter( result => {
        const ltitle = result.node.title.toLocaleLowerCase()
        const lsearch = searchString+"".toLocaleLowerCase()
        if (lsearch[0] === ltitle[0] && ltitle.includes(lsearch)) {
          priortizeFirstChar.push(result)
        } else {
          return ltitle.includes(lsearch)
        }
      })
      filteredSearch = priortizeFirstChar.concat(filteredSearch)
      console.log(filteredSearch)
      // 🚨
      // 🚨
      // 🚨
      // 🚨HEYOOO, you're causing an infinate loop!!!!
      // 🚨
      // 🚨WITH DAT 👇
      // 🚨
      // setSearchResults(filteredSearch)
      //
      // Maybe Figure out how send conditionals to useEffect

    }

  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <PageHeader> {title} </PageHeader>

      <div>
        <input
          className="coa-searchPage_input"
          placeholder="...<placeholder name>?"
          onChange={()=>searchKeyInput(event)}
          value={searchString}
        />
        <button
          className="coa-searchPage_search-button"
          onClick={()=>searchButtonPressed('click')}
        >
          Search
        </button>
      </div>

      <div> &nbsp; {searchResults.length} Pages</div>

      { searchResults.map( (page, i) => (
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
              {window.location.origin+page.node.janisUrls}
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
