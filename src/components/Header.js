import React, { Component } from 'react';
import SearchSVG from 'svg/Search'

class Header extends Component {

  render() {
    return (

      <header className="coa-Header" role="banner">
        <div className="wrapper">
          <div className="row">
            <div className="col-xs-6">
              <span>MENU</span>
              <span className="coa-Header__text-spacer">|</span>
              <span>AUSTIN.GOV</span>
            </div>
            <div className="col-xs-6 coa-Header__search">
              <a href="/search">Search <SearchSVG size="18"/></a>
            </div>
          </div>
        </div>


      </header>
    );
  }

}

export default Header;
