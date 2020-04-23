import React from 'react';
import { useRouteData, Head } from 'react-static';

import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';


// const SearchPage = ({ searchPage }) => {
const SearchPage = ( dummy ) => {

  const intl = useIntl();
  const { search, language } = useRouteData();

  // TO DO ...
  // Get Dynamic Title

  console.log("dummy :", dummy)
  console.log("search :", search)
  console.log("language :", language)


  console.log("window.location :", window.location)

  const title = "Search" // ⚠️useIntl

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <PageHeader> {title} </PageHeader>

      <div>
        <input type="text" className="coa-searchPage_input" style={{ display: "inline-block" }}/>
        <button className="coa-searchPage_search-button">Search</button>
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
