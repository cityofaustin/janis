import React, {Component} from 'react';

class GlobalSearch extends Component {

  render() {

    return  (

      <div role="search">
        <form className="coa-search usa-search usa-search-big">
          <label className="usa-sr-only" htmlFor="search-field-big">Search big</label>
          <input id="search-field-big" type="search" name="search"
            placeholder={this.props.placeholder}
          />
          <button type="submit">
            <span className="usa-search-submit-text">Search</span>
          </button>
        </form>
      </div>
    );

  }
}

export default GlobalSearch;
