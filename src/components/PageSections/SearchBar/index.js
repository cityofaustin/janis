import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl'
import { search as i18n1 } from 'js/i18n/definitions'

const SearchBar = ({ intl }) => {

  const [searchBarOpen, setSearchBarOpen] = useState(false)
  const searchBarState = searchBarOpen ? "open" : "closed"

  const toggleSearchBar = isOpen => {
    // setSearchBarOpen(!searchBarOpen)
    console.log("isOpen :", isOpen)
    if (isOpen) {
      if (typeof window !== 'undefined') {
        console.log('OK GO SEARCH', window.location)
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
