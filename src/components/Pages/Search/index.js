import React from 'react';
import { useRouteData, Head } from 'react-static';

import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';


// const SearchPage = ({ searchPage }) => {
const SearchPage = ( dummy ) => {

  const intl = useIntl();
  const { search } = useRouteData();

  // Should this be moved up the inhertance. I think it's faster
  // ... - maybe App.js or index.js ???
  // ... - But, my thought is that it's safer here...
  // const lang = window.location.pathname.split('/').filter(Boolean)
  // console.log("lang :", lang)
  // // if (lang[0] === "search") {
  // if (!["en","es","vi","ar"].includes(lang[0])) {
  //   window.location.href = `/en${window.location.pathname}`;
  // }

  // TO DO ...
  // Get Dynamic Title

  const title = "Search" // ⚠️useIntl

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <PageHeader> {title} </PageHeader>

      <div>
        <input type="text" className="coa-searchPage_input" style={{ display: "inline-block" }}/>
        <button>Search</button>
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
