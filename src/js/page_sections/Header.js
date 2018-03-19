import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import SearchSVG from 'js/svg/Search';
import AirplaneSVG from 'js/svg/Airplane';
import Menu from 'js/page_sections/Menu/Menu';
import I18nLink from 'js/modules/I18nLink'

const i18nMessages = defineMessages({
  headerMenuButton: {
    id: 'Header.Menu.button',
    defaultMessage: 'Menu',
  },
  headerSearchButton: {
    id: 'Header.Search.button',
    defaultMessage: 'Search',
  },
});

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

    const { intl } = this.props;

    return (
      <header className="coa-Header" role="banner">
        <div className="wrapper">
          <div className="row">
            <div className="col-xs-6 coa-Header__navbar-brand">
              <div className="coa-Header__menu d-lg-none">
                <button onClick={this.toggleMenu} tabIndex="0"
                  className="coa-Header__menu-toggle coa-button-reset" ref="menu"
                >
                  {intl.formatMessage(i18nMessages.headerMenuButton)}
                </button>
              </div>
              <div className="coa-Header__logo">
                <I18nLink to="/">ALPHA.AUSTIN.GOV</I18nLink>
              </div>
            </div>
            <div className="col-xs-6 coa-Header__right-controls">
              <div className="d-none d-md-block">
                <a href="http://www.austintexas.gov/airport">
                  <AirplaneSVG size="14"/>
                </a>
                <span className="coa-text-spacer--vertical"></span>
                <a href="http://311.austintexas.gov/">311</a>
                {/* <span className="coa-text-spacer--vertical"></span> */}
              </div>
              {/* <I18nLink to="/search" className="coa-Header__search">
                <span className="d-none d-md-block">{intl.formatMessage(i18nMessages.headerSearchButton)}</span> <SearchSVG size="18"/>
              </I18nLink> */}
            </div>
          </div>
        </div>
        <Menu isOpen={this.state.menuIsOpen} toggleMenu={this.toggleMenu}/>
      </header>
    );
  }

}

export default injectIntl(Header);
