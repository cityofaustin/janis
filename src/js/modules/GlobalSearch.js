import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import SearchSVG from 'js/svg/Search';

const i18nMessages = defineMessages({
  globalSearchLabel: {
    id: 'GlobalSearch.label',
    defaultMessage: 'Search Big',
  },
  globalSearchButtonText: {
    id: 'GlobalSearch.buttontext',
    defaultMessage: 'Search',
  },
});

const GlobalSearch = ({ placeholder, intl }) => (
  <div role="search">
    <form className="coa-GlobalSearch usa-search usa-search-big">
      <label className="usa-sr-only" htmlFor="search-field-big">
        {intl.formatMessage(i18nMessages.globalSearchLabel)}
      </label>
      <input id="search-field-big" type="search" name="search"
        placeholder={placeholder}
      />
      <button type="submit" className="coa-GlobalSearch__button">
        <span className="usa-search-submit-text">
          {intl.formatMessage(i18nMessages.globalSearchButtonText)}
        </span>
        <span className="coa-GlobalSearch__icon">
          <SearchSVG size="20"/>
        </span>
      </button>
    </form>
  </div>
);

export default injectIntl(GlobalSearch);
