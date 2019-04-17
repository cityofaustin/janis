import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

import { misc as i18n1, navigation as i18n2 } from 'js/i18n/definitions';

import I18nLink from 'components/I18n/I18nLink';
import ExternalLink from 'components/ExternalLink';

import LanguageSelectBar from 'components/PageSections/LanguageSelectBar';
import Menu from 'components/PageSections/Menu';
import HowYouKnowMenu from 'components/PageSections/HowYouKnowMenu';
import { themePropTypes } from 'components/PageSections/Menu/proptypes';
import GovSite from 'components/PageSections/Header/GovSite';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
      howYouKnowmenuIsOpen: false,
    };
  }

  componentDidMount() {
    // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
    this.menuElement = document.querySelector('#navMenu');
  }

  toggleMenu = e => {
    // If we're closing the menu, enable body scroll again
    if (this.state.menuIsOpen) enableBodyScroll(this.targetElement);
    // If we're opening the menu, disable body scroll
    if (!this.state.menuIsOpen) disableBodyScroll(this.targetElement);

    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    });
  };

  toggleHowYouKnowMenu = e => {
    this.setState({
      howYouKnowmenuIsOpen: !this.state.howYouKnowmenuIsOpen,
    });
  };

  render() {
    const { intl, navigation, path } = this.props;

    return (
      <header
        className={classNames('coa-Header', {
          'coa-Header--menu-is-open': this.state.menuIsOpen,
        })}
        role="banner"
      >
        <GovSite
          toggleHowYouKnowMenu={this.toggleHowYouKnowMenu}
          menuIsOpen={this.state.howYouKnowmenuIsOpen}
        />
        <div className="coa-Header__mobile-languages">
          <LanguageSelectBar path={path} />
        </div>
        <div className="container-fluid wrapper">
          <div className="coa-Header__controls">
            <div className="coa-Header__left-controls">
              <button
                onClick={this.toggleMenu}
                tabIndex="0"
                className="coa-Header__menu-toggle"
                ref="menu"
              >
                {this.state.menuIsOpen ? (
                  <i className="material-icons coa-Header__menuIcon">close</i>
                ) : (
                  <i className="material-icons coa-Header__menuIcon">menu</i>
                )}

                {intl.formatMessage(i18n2.menu)}
              </button>
              <div className="coa-Header__desktop-languages">
                <LanguageSelectBar path={path} />
              </div>
            </div>
            <div className="coa-Header__center-controls">
              <I18nLink className="coa-Header__logo" to="#">
                City of Austin
              </I18nLink>
            </div>
            <div className="coa-Header__right-controls-wrapper">
              <div className="coa-Header__right-controls">
                <ExternalLink to="http://www.austintexas.gov/airport">
                  {intl.formatMessage(i18n1.airport)}
                </ExternalLink>
                <span className="coa-text-spacer--vertical" />
                <ExternalLink to="http://311.austintexas.gov/">
                  311
                </ExternalLink>
              </div>
            </div>
          </div>
        </div>
        <Menu isMenuOpen={this.state.menuIsOpen} />
        <HowYouKnowMenu
          open={this.state.howYouKnowmenuIsOpen}
          toggleHowYouKnowMenu={this.toggleHowYouKnowMenu}
        />
      </header>
    );
  }
}

Header.propTypes = {
  // navigation: PropTypes.arrayOf(themePropTypes).isRequired,
  path: PropTypes.string.isRequired,
};

export default injectIntl(Header);
