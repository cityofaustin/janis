import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl'
import { search as i18n1 } from 'js/i18n/definitions'


const SearchBar = ({ intl }) => {

  const [searchBarOpen, setSearchBarOpen] = useState(true)
  const toggleSearchBar = () => { setSearchBarOpen(true) }

  return (
    <div className="coa-SearchBar">

    { searchBarOpen ? (

      <div className="coa-SearchBar__container">
        <input />
        <div>
          <a href='/search' className="coa-SearchBar__search-container">
            <span className="coa-SearchBar__search-title">
              {intl.formatMessage(i18n1.search)}
            </span>
            <i className="material-icons">arrow_forward</i>
          </a>
        </div>
      </div>

    ) : (

      <div
        className="coa-SearchBar__search-button"
        onClick={()=>toggleSearchBar()}
      >
        <i className="material-icons coa-SearchBar__search-icon">search</i>
        <span className="coa-SearchBar__search-title">
          {intl.formatMessage(i18n1.search)}
        </span>
      </div>

    )}

    </div>

  )

}


export default injectIntl(SearchBar)
//
// <a href='/search' className="coa-SearchBar__search-container">
//   <i className="material-icons coa-SearchBar__search-icon">search</i>
//   <span className="coa-SearchBar__search-title">
//     {intl.formatMessage(i18n1.search)}
//   </span>
// </a>
