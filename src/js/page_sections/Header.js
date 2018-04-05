import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import SearchSVG from 'js/svg/Search';
import Menu from 'js/page_sections/Menu/Menu';
import I18nLink from 'js/modules/I18nLink';
import ExternalLink from 'js/modules/ExternalLink';

const i18nMessages = defineMessages({
  headerMenuButton: {
    id: 'Header.Menu.button',
    defaultMessage: 'Menu',
  },
  headerSearchButton: {
    id: 'Header.Search.button',
    defaultMessage: 'Search',
  },
  headerAirportText: {
    id: 'Header.Airport.text',
    defaultMessage: 'AIRPORT',
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  toggleMenu = (e) => {
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
      <header className={`coa-Header ${this.state.menuIsOpen ? 'coa-Header--menu-is-open' : ''}`} role="banner">
        <div className="container-fluid wrapper">
          <div className="coa-Header__controls">
            <div className="coa-Header__left-controls">
              <button onClick={this.toggleMenu} tabIndex="0"
                className="coa-Header__menu-toggle d-lg-none" ref="menu"
              >
                {intl.formatMessage(i18nMessages.headerMenuButton)}
              </button>
              <span className="coa-text-spacer--vertical d-lg-none"></span>
              <I18nLink className="coa-Header__logo" to="/">ALPHA.AUSTIN.GOV</I18nLink>
            </div>
            <div className="coa-Header__right-controls">
              <ExternalLink to="http://www.austintexas.gov/airport">
                {intl.formatMessage(i18nMessages.headerAirportText)}
              </ExternalLink>
              <span className="coa-text-spacer--vertical"></span>
              <ExternalLink to="http://311.austintexas.gov/">
                311
              </ExternalLink>
              {/* <I18nLink to="/search" className="coa-Header__search">
                <span className="d-none d-md-block">{intl.formatMessage(i18nMessages.headerSearchButton)}</span> <SearchSVG size="18"/>
              </I18nLink> */}
            </div>
          </div>
        </div>
        <Menu isMenuOpen={this.state.menuIsOpen} toggleMenu={this.toggleMenu} />
      </header>
    );
  }

}

export default injectIntl(Header);
