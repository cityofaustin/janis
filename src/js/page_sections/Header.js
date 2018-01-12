import React, { Component } from 'react';
import SearchSVG from 'js/svg/Search';
import Navmenu from 'js/page_sections/Navmenu';
import { Link } from 'react-router-dom';
import getPathWithLangCode from 'js/helpers/language';

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
              <span onClick={this.toggleMenu} tabIndex="0"
                className="coa-Header__menu-toggle"
              >
                MENU
              </span>
              <span className="coa-text-spacer--vertical"></span>
              <Link to={getPathWithLangCode('/')}>AUSTIN.GOV</Link>
            </div>
            <div className="col-xs-6 coa-Header__search">
              <Link to={getPathWithLangCode('/search')}>
                Search <SearchSVG size="18"/>
              </Link>
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
