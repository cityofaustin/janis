import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

import { search as i18n1, navigation as i18n2 } from 'js/i18n/definitions';

import I18nLink from 'components/I18n/I18nLink';

import LanguageSelectBar from 'components/PageSections/LanguageSelectBar';
import HowYouKnowMenu from 'components/PageSections/HowYouKnowMenu';
import GovSite from 'components/PageSections/Header/GovSite';
import PendingTranslation from 'components/PageSections/PendingTranslation';
import SearchBar from 'components/PageSections/SearchBar';
import SearchIcon from 'components/PageSections/SearchBar/SearchIcon'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import FullSiteMenu from '../Menu/FullSiteMenu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      howYouKnowMenuIsOpen: false,
      topMenuActive: false,
      showMessage: false,
      slug: "",
    };

    // Bind wrappers and outside-click functions
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setHowYouKnowWrapperRef = this.setHowYouKnowWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.togglePendingTranslation = this.togglePendingTranslation.bind(this);
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

    if (this.wrapperRef && (
      !this.wrapperRef.contains(event.target) ||
      event.target.className === "coa-FullSiteMenu__subNav" ||
      event.target.className === "coa-MessageWIP" ||
      event.target.className === "coa-FullSiteMenu__container" ||
      event.target.className === "coa-ThemesNav__list" ||
      event.target.className === "coa-ThemesNav__theme" ||
      event.target.className === "coa-FullSiteMenu coa-FullSiteMenu--active" ||
      event.target.className === "coa-FullSiteMenu_dropdown"
    )) {
      // If we're clicking on the mobile close button, we'll handle this in toggleFullSiteMenu instead
      if (
        event.target.className !== 'coa-Header__menuIcon' &&
        event.target.parentElement.className !== 'coa-Header__menuIcon' &&
        // for the pending translation dropdown:
        event.target.parentElement.className !==
          'coa-PendingTranslation coa-PendingTranslation--is-open' &&
        event.target.parentElement.className !==
          'coa-PendingTranslation--link' &&
        event.target.className !==
          'coa-LanguageSelectBar__background coa-LanguageSelectBar__background--active' &&
        event.target.className !==
          'coa-LanguageSelectBar__item coa-LanguageSelectBar__item--active coa-LanguageSelectBar__item--showMessage coa-LanguageSelectBar__item--activeMessage' &&
        event.target.className !== 'material-icons coa-LanguageChevron'
      ) {
        this.setState({
          topMenuActive: false,
          showMessage: false,
          slug: "",
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
        howYouKnowMenuIsOpen: false,
      });
    }
  }

  openFullSiteMenu = e => {
    // Show the menu, if the user clicks on element or preses Space or Enter in keyboard
    if (e.key === 'Enter' || e.key === ' ' || e.type == 'click') {
      e.preventDefault();
      this.setState({
        topMenuActive: true,
        showMessage: false,
        slug: e.target.getAttribute("slug"),
      });
    }

    // Hide menu if the user presses escape
    if (e.key === 'Escape') {
      this.setState({
        topMenuActive: false,
        showMessage: false,
        slug: "",
      });
    }
  };

  closeFullSiteMenuItem = e => {
    // Hide menu on click, Enter, Space or Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      this.setState({
        topMenuActive: false,
        slug: "",
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
        showMessage: false,
        slug: "",
      });
    }
  };

  toggleFullSiteMenu = () => {
    this.setState(prevState => ({
      topMenuActive: !prevState.topMenuActive,
      showMessage: false,
    }));
  };

  toggleHowYouKnowMenu = e => {
    this.setState(prevState => ({
      howYouKnowMenuIsOpen: !prevState.howYouKnowMenuIsOpen,
    }));
  };

  keyboardHowYouKnowMenu = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.setState(prevState => ({
        howYouKnowMenuIsOpen: !prevState.howYouKnowMenuIsOpen,
      }));
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      this.setState({ howYouKnowMenuIsOpen: false });
    }
  };

  togglePendingTranslation = () => {
    this.setState(prevState => ({
      showMessage: !prevState.showMessage,
      topMenuActive: false,
    }));
  };

  closeMessage = () => {
    this.setState({ showMessage: false });
  };

  render() {
    const { intl, navigation, path } = this.props;

    return (
      <header
        className={classNames('coa-Header', {
          'coa-Header--menu-is-open': this.state.menuIsOpen,
          'coa-Header--gov-is-open': this.state.howYouKnowMenuIsOpen,
        })}
        role="banner"
      >
        <div className="coa-Header--container">
          <div className="coa-Header__mobile-languages">
            <LanguageSelectBar
              path={path}
              showMessage={this.state.showMessage}
              togglePendingTranslation={() => this.togglePendingTranslation()}
            />
            <PendingTranslation
              open={this.state.showMessage}
              closeMessage={() => this.closeMessage()}
            />
          </div>
          <div className="coa-Header__container">
            <div className="coa-Header__controls">
              <div className="coa-Header__left-controls">
                <div className="coa-Header__desktop-languages">
                  <LanguageSelectBar
                    path={path}
                    showMessage={this.state.showMessage}
                    togglePendingTranslation={() =>
                      this.togglePendingTranslation()
                    }
                  />
                  <PendingTranslation
                    open={this.state.showMessage}
                    closeMessage={() => this.closeMessage()}
                  />
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
                  <> {intl.formatMessage(i18n2.close)} </>
                ) : (
                  <> {intl.formatMessage(i18n2.menu)} </>
                )}

                </a>
                <I18nLink className="coa-Header__logo" to="/">
                  Austin.gov
                </I18nLink>

                <SearchIcon intl={intl} menuState={this.state.topMenuActive && "active"}/>

              </div>

              <SearchBar intl={intl} />

            </div>
          </div>

          <FullSiteMenu
            refnode={this.setWrapperRef}
            navigation={navigation}
            handleFullSiteMenuItem={this.closeFullSiteMenuItem}
            handleFullSiteMenuOpen={this.openFullSiteMenu}
            handleFullSiteMenuClose={this.closeFullSiteMenu}
            slug={this.state.slug}
            isTopMenuActive={this.state.topMenuActive}
            toggleFullSiteMenu={this.toggleFullSiteMenu}
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
};

export default injectIntl(Header);
