import React, { Component } from 'react';
import SearchSVG from 'svg/Search'

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

  menuClassName = () => {
    const baseClassName = `coa-Header__nav`;
    return this.state.menuIsOpen ? `${baseClassName}--open` : baseClassName;
  }

  render() {
    return (

      <header className="coa-Header" role="banner">
        <div className="wrapper">
          <div className="row">
            <div className="col-xs-6 coa-Header__menu">
              <span onClick={this.toggleMenu}>MENU</span>
              <span className="coa-Header__text-spacer">|</span>
              <a href="/">AUSTIN.GOV</a>
            </div>
            <div className="col-xs-6 coa-Header__search">
              <a href="/search">Search <SearchSVG size="18"/></a>
            </div>
          </div>
        </div>
        <nav role="navigation" className={this.menuClassName()}>
          <span onClick={this.toggleMenu}>x</span>
          <ul>
            <li>nav</li>
            <li>nav</li>
            <li>nav</li>
          </ul>
        </nav>


      </header>
    );
  }

}

export default Header;
