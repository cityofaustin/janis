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

    // Bind wrappers and outside-click functions
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setHowYouKnowWrapperRef = this.setHowYouKnowWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('touchstart', this.handleClickOutside);
  }

  // Sets up the wrapper reference
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  // Sets up the how you know wrapper reference
  setHowYouKnowWrapperRef(node) {
    this.howYouKnowwrapperRef = node;
  }

  // Hides the menu
  handleClickOutside(event) {
    // Full site
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      // If we're clicking on the mobile close button, we'll handle this in toggleFullSiteMenu instead
      if (
        event.target.className !== 'coa-Header__menuIcon' &&
        event.target.parentElement.className !== 'coa-Header__menuIcon'
      ) {
        this.setState({
          topMenuActive: false,
        });
      }
    }

    // How you know
    if (
      this.howYouKnowwrapperRef &&
      !this.howYouKnowwrapperRef.contains(event.target)
    ) {
      // If we're clicking on the mobile close button, we'll handle this in toggleFullSiteMenu instead
      this.setState({
        howYouKnowmenuIsOpen: false,
      });
    }
  }

  openFullSiteMenu = e => {
    // Show the menu, if the user clicks on element or preses Space or Enter in keyboard
    if (e.key === 'Enter' || e.key === ' ' || e.type == 'click') {
      e.preventDefault();
      this.setState({
        topMenuActive: true,
      });
    }

    // Hide menu if the user presses escape
    if (e.key === 'Escape') {
      this.setState({
        topMenuActive: false,
      });
    }
  };

  closeFullSiteMenuItem = e => {
    // Hide menu on click, Enter, Space or Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      this.setState({
        topMenuActive: false,
      });
    }

    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  closeFullSiteMenu = e => {
    // Hide menu on click, Enter, Space or Escape
    if (
      e.key === 'Enter' ||
      e.key === ' ' ||
      e.key === 'Escape' ||
      e.type == 'click'
    ) {
      e.preventDefault();
      this.setState({
        topMenuActive: false,
      });
    }
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
          refnode={this.setHowYouKnowWrapperRef}
          open={this.state.howYouKnowmenuIsOpen}
          toggleHowYouKnowMenu={this.toggleHowYouKnowMenu}
        />

        <FullSiteMenu
          // ref={node => this.node = node}
          refnode={this.setWrapperRef}
          navigation={navigation}
          handleFullSiteMenuItem={this.closeFullSiteMenuItem}
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
