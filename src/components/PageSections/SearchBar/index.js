import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl'
import { search as i18n1 } from 'js/i18n/definitions'

import SearchIcon from 'components/PageSections/SearchBar/SearchIcon'

const SearchBar = ({ intl }) => {

  const [searchBarOpen, setSearchBarOpen] = useState(true)
  const toggleSearchBar = () => { setSearchBarOpen(!searchBarOpen) }

  return (
    <div className="coa-SearchBar">

      { searchBarOpen ? (
        <div className="coa-SearchBar__container">
          <input className="coa-SearchBar__input"/>
          <a href='/search' className="coa-SearchBar__search-button">
            <span className="coa-SearchBar__search-button-text">
              {intl.formatMessage(i18n1.search)}
            </span>
            <i className="material-icons coa-SearchBar__search-button-text">arrow_forward</i>
          </a>
        </div>
      ) : (
        <div> closed </div>
      )}

      <SearchIcon />

    </div>

  )

}


export default injectIntl(SearchBar)
//
// <div
//   className="coa-SearchBar__search-button"
//   onClick={()=>toggleSearchBar()}
// >
//   <i className="material-icons coa-SearchBar__search-icon">search</i>
//   <span className="coa-SearchBar__search-title">
//     {intl.formatMessage(i18n1.search)}
//   </span>
// </div>
