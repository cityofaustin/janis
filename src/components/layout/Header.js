import React, { Component } from 'react';
import SearchSVG from 'svg/Search';
import Navmenu from 'components/Navmenu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    })
  }

  render() {
    return (
      <header className="coa-Header" role="banner">
        <div className="wrapper">
          <div className="row">
            <div className="col-xs-6 coa-Header__menu">
              <span onClick={this.toggleMenu} tabIndex="0">MENU</span>
              <span className="coa-Header__text-spacer">|</span>
              <a href="/">AUSTIN.GOV</a>
            </div>
            <div className="col-xs-6 coa-Header__search">
              <a href="/search">Search <SearchSVG size="18"/></a>
            </div>
          </div>
        </div>
        <Navmenu {...this.props}
          isOpen={this.state.menuIsOpen} toggleMenu={this.toggleMenu}
        />
      </header>
    );
  }

}

export default Header;
