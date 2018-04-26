import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import Menu from 'components/PageSections/Menu';
import I18nLink from 'components/I18nLinks/I18nLink';
import ExternalLink from 'components/ExternalLink';

const i18nMessages = defineMessages({
  headerMenuButton: {
    id: 'Header.Menu.button',
    defaultMessage: 'Menu',
  },
  headerAirportText: {
    id: 'Header.Airport.text',
    defaultMessage: 'AIRPORT',
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  closeMenu = e => {
    this.refs.menu.focus();
    this.setState({
      menuIsOpen: false,
    });
  };

  openMenu = e => {
    this.setState({
      menuIsOpen: true,
    });
  };

  render() {
    const { intl, navigation } = this.props;

    return (
      <header
        className={`coa-Header ${
          this.state.menuIsOpen ? 'coa-Header--menu-is-open' : ''
        }`}
        role="banner"
      >
        <div className="container-fluid wrapper">
          <div className="coa-Header__controls">
            <div className="coa-Header__left-controls">
              <button
                onClick={this.openMenu}
                tabIndex="0"
                className="coa-Header__menu-toggle d-lg-none"
                ref="menu"
              >
                {intl.formatMessage(i18nMessages.headerMenuButton)}
              </button>
              <span className="coa-text-spacer--vertical d-lg-none" />
              <I18nLink className="coa-Header__logo" to="/">
                ALPHA.AUSTIN.GOV
              </I18nLink>
            </div>
            <div className="coa-Header__right-controls">
              <ExternalLink to="http://www.austintexas.gov/airport">
                {intl.formatMessage(i18nMessages.headerAirportText)}
              </ExternalLink>
              <span className="coa-text-spacer--vertical" />
              <ExternalLink to="http://311.austintexas.gov/">311</ExternalLink>
            </div>
          </div>
        </div>
        <Menu
          isMenuOpen={this.state.menuIsOpen}
          closeMenu={this.closeMenu}
          navigation={navigation}
        />
      </header>
    );
  }
}

export default injectIntl(Header);
