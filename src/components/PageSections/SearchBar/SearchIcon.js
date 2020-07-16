import React from 'react'
import { injectIntl } from 'react-intl'
import { search as i18n1 } from 'js/i18n/definitions'

const SearchIcon = ({ intl }) => (

  <a
    tabindex="0"
    href='/search'
    className="coa-SearchBar__search-container-icon"
  >
    <div className="coa-SearchBar__search-button">
      <span className="coa-SearchBar__search-button-text searchIcon">
        <i className="material-icons coa-SearchBar__search-button-search">search</i>
        {intl.formatMessage(i18n1.search)}
      </span>
    </div>
  </a>


)


export default SearchIcon

// <a href='/search' className="coa-SearchBar__search-container-icon">
//   <i className="material-icons coa-SearchBar__search-icon">search</i>
// </a>
