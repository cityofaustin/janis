import React, { Component } from 'react';
import SearchSVG from 'js/svg/Search';
import Navmenu from 'js/page_sections/Navmenu';
import I18nLink from 'js/modules/I18nLink'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  toggleMenu = () => {
    if (this.state.menuIsOpen) {
      this.refs.menu.focus();
    }
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
              <span onClick={this.toggleMenu} tabIndex="0"
                className="coa-Header__menu-toggle" ref="menu"
              >
                MENU
              </span>
              <span className="coa-text-spacer--vertical"></span>
              <I18nLink to="/">ALPHA.AUSTIN.GOV</I18nLink>
            </div>
            <div className="col-xs-6 coa-Header__search">
              <I18nLink to="/search">
                Search <SearchSVG size="18"/>
              </I18nLink>
            </div>
          </div>
        </div>
        <Navmenu isOpen={this.state.menuIsOpen} toggleMenu={this.toggleMenu}/>
      </header>
    );
  }

}

export default Header;
