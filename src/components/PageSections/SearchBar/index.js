import React, { useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { search as i18n1 } from 'js/i18n/definitions'
import { queryStringBuilder } from 'js/helpers/queryObjectBuilder'

const SearchBar = ({ intl }) => {

  const [searchBarOpen, setSearchBarOpen] = useState(false)
  const searchBarState = searchBarOpen ? "open" : "closed"

  const toggleSearchBar = isOpen => {
    if (isOpen) {
      if (typeof window !== 'undefined') {
        /*
          If the search bar changed to do quick search results. Let's componentize the
          quick search filter and use it here as well as on the search page.
        */
        const searchTerm = document.getElementById("coa_SearchBar__input")
        window.location.hash = queryStringBuilder({
          '?': searchTerm.value,
          page: 1
        })
        window.location.pathname = "/" + intl.locale + "/search"
      }
    } else {
      const input = document.getElementById('coa_SearchBar__input')
      input.focus()
      setSearchBarOpen(true)
    }
  }

  const searchKeyInput = event => {
    if (event.key === "Enter") {
      toggleSearchBar(true)
    }
  }

  return (
    <div className="coa-SearchBar">

      <span className={"coa-SearchBar__container "+searchBarState}>
        <input
          id="coa_SearchBar__input"
          className={"coa-SearchBar__input "+searchBarState}
          onKeyPress={()=>searchKeyInput(event)}
          tabindex={searchBarOpen ? "0" : "-1"}
        />
        <a
          onClick={()=>toggleSearchBar(searchBarOpen)}
          onKeyPress={()=>toggleSearchBar(searchBarOpen)}
          tabindex="0"
        >
          <div className={"coa-SearchBar__search-button "+searchBarState}>
            <span className={"coa-SearchBar__search-button-text "+searchBarState}>
              <i className={"material-icons coa-SearchBar__search-button-search "+searchBarState}>search</i>
              {intl.formatMessage(i18n1.search)}
              <i className={"material-icons coa-SearchBar__search-button-arrow "+searchBarState}>arrow_forward</i>
            </span>
          </div>
        </a>
      </span>

    </div>

  )

}


export default injectIntl(SearchBar)
