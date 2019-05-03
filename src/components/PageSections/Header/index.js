import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

import { misc as i18n1, navigation as i18n2 } from 'js/i18n/definitions';

import I18nLink from 'components/I18n/I18nLink';
import ExternalLink from 'components/ExternalLink';

import LanguageSelectBar from 'components/PageSections/LanguageSelectBar';
import HowYouKnowMenu from 'components/PageSections/HowYouKnowMenu';
import { themePropTypes } from 'components/PageSections/Menu/proptypes';
import GovSite from 'components/PageSections/Header/GovSite';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import FullSiteMenu from '../Menu/FullSiteMenu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      howYouKnowmenuIsOpen: false,
      topMenuActive: false,
    };
  }

  componentDidMount() {
    // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
    this.menuElement = document.querySelector('#navMenu');
  }

  openFullSiteMenu = () => {
    this.setState({
      topMenuActive: true,
    });
  };

  closeFullSiteMenu = () => {
    this.setState({
      topMenuActive: false,
    });
  };

  toggleFullSiteMenu = () => {
    this.setState({
      topMenuActive: !this.state.topMenuActive,
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
        <div className="coa-Header__container">
          <div className="coa-Header__controls">
            <div className="coa-Header__left-controls">
              <div className="coa-Header__desktop-languages">
                <LanguageSelectBar path={path} />
              </div>
            </div>
            <div
              className={
                'coa-Header__center-controls ' +
                (this.state.topMenuActive
                  ? 'coa-Header__center-controls--active'
                  : null)
              }
            >
              <a
                className="coa-Header__menuIcon"
                onClick={this.toggleFullSiteMenu}
              >
                {this.state.topMenuActive ? (
                  <i className="material-icons">close</i>
                ) : (
                  <i className="material-icons">menu</i>
                )}
                {intl.formatMessage(i18n2.menu)}
              </a>
              <I18nLink className="coa-Header__logo" to="/">
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
        <HowYouKnowMenu
          open={this.state.howYouKnowmenuIsOpen}
          toggleHowYouKnowMenu={this.toggleHowYouKnowMenu}
        />

        <FullSiteMenu
          navigation={navigation}
          handleFullSiteMenuOpen={this.openFullSiteMenu}
          handleFullSiteMenuClose={this.closeFullSiteMenu}
          isTopMenuActive={this.state.topMenuActive}
        />
      </header>
    );
  }
}

Header.propTypes = {
  navigation: PropTypes.arrayOf(themePropTypes).isRequired,
  path: PropTypes.string.isRequired,
};

export default injectIntl(Header);
