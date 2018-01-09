import React, {Component} from 'react';

class GlobalSearch extends Component {

  render() {

    return  (

      <div>
        <form class="usa-search usa-search-big">
          <label class="usa-sr-only" for="search-field-big">Search big</label>
          <input id="search-field-big" type="search" name="search"/>
          <button type="submit">
            <span class="usa-search-submit-text">Search</span>
          </button>
        </form>
      </div>
    );

  }
}

export default GlobalSearch;
