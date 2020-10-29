import React, { useState, useRef } from 'react'
import { useIntl } from 'react-intl';
import { search as i18n1 } from 'js/i18n/definitions'
import queryString from 'query-string';

const SearchBar = () => {
  const intl = useIntl();
  const [searchBarOpen, setSearchBarOpen] = useState(false)
  const [searchString, setSearchString] = useState("")
  const searchBarRef = useRef();
  const searchBarState = searchBarOpen ? "open" : "closed"

  const toggleSearchBar = isOpen => {
    if (isOpen) {
      if (typeof window !== 'undefined') {
        /*
          If the search bar changed to do quick search results. Let's componentize the
          quick search filter and use it here as well as on the search page.
        */
        window.location.href =
          window.location.origin +
          "/" + intl.locale + "/search/?" +
          queryString.stringify({
            "q": searchString,
            "page": 1,
          })
      }
    } else {
      searchBarRef.current.focus()
      setSearchBarOpen(true)
    }
  }

  const searchKeyInput = event => {
    if (event.key === "Enter") {
      toggleSearchBar(true)
    } else {
      setSearchString(event.target.value)
    }
  }

  return (
    <div className="coa-SearchBar">

      <span className={"coa-SearchBar__container "+searchBarState}>
        <input
          ref={searchBarRef}
          className={"coa-SearchBar__input "+searchBarState}
          onChange={()=>searchKeyInput(event)}
          onKeyPress={()=>searchKeyInput(event)}
          tabindex={searchBarOpen ? "0" : "-1"}
          value={searchString}
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


export default SearchBar
