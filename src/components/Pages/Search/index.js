// import React from 'react';
import React, { useState, useEffect  } from 'react'

import { useRouteData, Head } from 'react-static';

import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import { buildPages, buildPagination } from 'js/helpers/pagination.js'



// const SearchPage = ({ searchPage }) => {
const SearchPage = ( dummy ) => {

  const intl = useIntl();
  const { search } = useRouteData();
  const title = "Search" // ⚠️useIntl
  let uri_dec = decodeURIComponent(window.location.search).split('?')[1];
  const [ searchString, setSearchString ] = useState(uri_dec)

  // let searchString = uri_dec

  // TO DO ...
  // Get Dynamic Title


  useEffect(() => {
    console.log('hook')
    // domWindow = window
    // window.onpopstate = function(event) {
    //   setPageNumber(getHash())
    // }
    // window.location.hash = pageNumber+1
  })


  const searchButtonPressed = function(x) {
    console.log('searchButtonPressed', searchString)
    console.log("window.location :", window.location)
    window.location.search = searchString
  }

  const searchKeyInput = function(event) {
    searchString = event.target.value
    console.log('searchInput: ', event.target.value)
    console.log("searchString :", searchString)
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


      { search.edges.map( (page, i) => (
        <div key={i}>
          {page.node.title} :
        </div>
      )) }

    </div>
  )
}


export default SearchPage
