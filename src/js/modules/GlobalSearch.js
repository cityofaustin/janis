import React, {Component} from 'react';
import SearchSVG from 'js/svg/Search';

class GlobalSearch extends Component {

  render() {

    return  (

      <div role="search">
        <form className="coa-GlobalSearch usa-search usa-search-big">
          <label className="usa-sr-only" htmlFor="search-field-big">Search big</label>
          <input id="search-field-big" type="search" name="search"
            placeholder={this.props.placeholder}
          />
          <button type="submit" className="coa-GlobalSearch__button">
            <span className="usa-search-submit-text">
              Search
            </span>
            <span className="coa-GlobalSearch__icon">
              <SearchSVG size="20"/>
            </span>
          </button>
        </form>
      </div>
    );

  }
}

export default GlobalSearch;
