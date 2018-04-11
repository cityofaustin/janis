import React, { Component } from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types'

import I18nNavLink from 'js/modules/I18nNavLink';
import ExternalLink from 'js/modules/ExternalLink';
import MenuItem from 'js/page_sections/Menu/MenuItem';

import CloseSVG from 'js/svg/Close';
import citySealImg from 'images/coa_seal.png';

const i18nMessages = defineMessages({
  home: {
    id: 'Menu.HomeMobileListItem.text',
    defaultMessage: 'Home',
  },
  airport: {
    id: 'Menu.AirportMobileListItem.text',
    defaultMessage: 'Airport',
  },
  call311: {
    id: 'Menu.ThreeOneOneMobileListItem.callText',
    defaultMessage: 'Call 311',
  },
  online311: {
    id: 'Menu.ThreeOneOneMobileListItem.onlineText',
    defaultMessage: 'Submit an Online Request',
  },
  privacy: {
    id: 'Menu.PrivacyPolicyListItem.text',
    defaultMessage: 'Read About Privacy',
  },
  sealAltText: {
    id: 'Menu.MobileFooter.sealAltText',
    defaultMessage: 'City of Austin Seal',
  },
});


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSubmenuId: null,
    };
  }

  focusOnClose = () => {
    this.refs.closeTrigger && this.refs.closeTrigger.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isMenuOpen && !prevProps.isMenuOpen) {
      this.focusOnClose();
    }
  }

  isSubmenuOpen = (id) => (
    this.state.openSubmenuId === id
  )

  toggleAllMenus = (e) => {
    this.props.toggleMenu();
    this.setState({
      openSubmenuId: null
    });
  }

  toggleSubmenu = (e, openSubmenuId) => {
    if (e.type === "keydown" && e.key !== 'Enter') return false;
    if (openSubmenuId && openSubmenuId === this.state.openSubmenuId) {
      this.setState({
        openSubmenuId: null
      })
    } else {
      this.setState({
        openSubmenuId: openSubmenuId,
      })
    }
  }

  render() {
    const { allThemes } = this.props.navigation;

    return allThemes.edges.length && (
      <div className="container-fluid wrapper">
        <nav className={`coa-Menu ${this.props.isMenuOpen ? 'coa-Menu--open' : ''}`}
          role="navigation"
        >
          <button className="coa-Menu__close-btn d-lg-none"
            onClick={this.toggleAllMenus}
            ref="closeTrigger"
            tabIndex="0"
          >
            <CloseSVG size="40" />
          </button>
          <ul className="coa-Menu__list">
            <HomeMobileMenuItem handleToggleAllMenus={this.toggleAllMenus} />
            <AirportMobileMenuItem />
            <ThreeOneOneMobileMenuItem />
        {
          allThemes.edges.map(({node: theme}, i) => (
            <MenuItem
              key={i}
              id={i}
              theme={theme}
              isSubmenuOpen={this.isSubmenuOpen(i)}
              handleToggleAllMenus={this.toggleAllMenus}
              handleSubmenuToggle={this.toggleSubmenu}
            />
          ))
        }
            <PrivacyPolicyMenuItem handleToggleAllMenus={this.toggleAllMenus} />
            <MobileFooter />
          </ul>
        </nav>
        {
          /*
            this provides a full page click target area behind the nav menu
            which, when clicked, will close the submenu
          */
            this.state.openSubmenuId !== null && (
            <div className="coa-Menu__close-submenu-click-target"
              onClick={() => this.setState({ openSubmenuId: null })}
            ></div>
          )
        }
      </div>
    );
  }
}

const HomeMobileMenuItem = injectIntl(({handleToggleAllMenus, intl}) => (
  <li className="d-lg-none" onClick={handleToggleAllMenus}>
    <div className="coa-MenuItem coa-MenuItem--small coa-MenuItem--home">
      <I18nNavLink to="/" exact>
        {intl.formatMessage(i18nMessages.home)}
      </I18nNavLink>
    </div>
  </li>
))

const AirportMobileMenuItem = injectIntl(({intl}) => (
  <li className="d-lg-none">
    <div className="coa-MenuItem coa-MenuItem--small">
      <ExternalLink to="http://www.austintexas.gov/airport">
        {intl.formatMessage(i18nMessages.airport)}
      </ExternalLink>
    </div>
  </li>
))

const ThreeOneOneMobileMenuItem = injectIntl(({intl}) => (
  <li className="d-lg-none">
  {/* tel aria guidance from: http://thatdevgirl.com/blog/accessibility-phone-number-formatting */}
    <div className="coa-MenuItem coa-MenuItem--small">
      <a href="tel:311" aria-label="3 1 1.">
        {intl.formatMessage(i18nMessages.call311)}
      </a>
      &nbsp;or&nbsp;
      <ExternalLink to="http://311.austintexas.gov/">
        {intl.formatMessage(i18nMessages.online311)}
      </ExternalLink>
    </div>
  </li>
))

const PrivacyPolicyMenuItem = injectIntl(({handleToggleAllMenus, intl}) => (
  <li className="d-lg-none" onClick={handleToggleAllMenus}>
    <div className="coa-MenuItem coa-MenuItem--small">
      <a href="#">
        {intl.formatMessage(i18nMessages.privacy)}
      </a>
    </div>
  </li>
))

const MobileFooter = injectIntl(({intl}) => (
  <div className="coa-Menu__mobile-footer">
    <p className="coa-Menu__footer-text d-lg-none">
      <FormattedMessage
        id="Footer.bodytext"
        defaultMessage="Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit {citySiteLink}. Learn more about the new website at {projectsSiteLink}."
        values ={{
          citySiteLink: <ExternalLink to="http://austintexas.gov" iconSize="small">austintexas.gov</ExternalLink>,
          projectsSiteLink: <ExternalLink to="http://projects.austintexas.io/projects/austin-digital-services-discovery/about/what-we-are-doing/" iconSize="small">projects.austintexas.io</ExternalLink>
        }}
      />
    </p>
    <img className="d-lg-none" src={citySealImg} alt={intl.formatMessage(i18nMessages.sealAltText)} />
  </div>
))

Menu.propTypes = {
  navigation: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool,
}

export default injectIntl(Menu);
