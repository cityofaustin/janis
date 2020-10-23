import React, { useState, useEffect, useRef } from 'react'
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import {
  useQueryParam,
  StringParam,
  NumberParam,
  withDefault,
} from 'use-query-params';

import { search as i18n } from 'js/i18n/definitions';
import PageHeader from 'components/PageHeader';
import { searchWorker } from 'js/helpers/searchWorker'
import PaginationSearchPage from 'components/PageSections/Pagination/PaginationSearchPage'

const SearchPage = () => {
  const intl = useIntl();
  const [searchedTerm, setSearchedTerm] = useQueryParam("q", StringParam)
  const [pageNumber, setPageNumber] = useQueryParam('page', withDefault(NumberParam, 1));
  const [searchString, setSearchString] = useState(searchedTerm)

  const searchInputRef = useRef()
  const searchKeyInput = event => {
    if (event.key === "Enter") {
      submitSearch()
      searchInputRef.current.blur()
    } else {
      setSearchString(event.target.value)
    }
  }

  // Set "q" QueryParam to "undefined" to remove it.
  const submitSearch = ()=>{
    setSearchedTerm(searchString || undefined)
    setPageNumber(1)
  }

  return (
    <div>

      <Head>
        <title> {intl.formatMessage(i18n.search)} </title>
      </Head>

      <PageHeader contentType={'search'}>
        {intl.formatMessage(i18n.search)}
        <div className="coa-search_bar_container">
          <input
            ref={searchInputRef}
            id="coa-search_input"
            className="coa-search_inputs"
            onChange={searchKeyInput}
            onKeyPress={searchKeyInput}
            value={searchString}
          />
          <button
            className="coa-search_button"
            onClick={submitSearch}
          >
            {intl.formatMessage(i18n.search)}
          </button>
        </div>
      </PageHeader>

      <div id="coa-search_results">
        <PaginationSearchPage
          searchedTerm={searchedTerm}
        />
      </div>
    </div>
  )
}

export default SearchPage
