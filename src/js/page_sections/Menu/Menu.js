import React, { Component } from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types'

import I18nNavLink from 'js/modules/I18nNavLink';
import ExternalLink from 'js/modules/ExternalLink';
import MenuItem from 'js/page_sections/Menu/MenuItem';
import navigation_en from '__tmpdata/navigation';
import navigation_es from '__tmpdata/navigation_es';
import navigation_vi from '__tmpdata/navigation_vi';
import navigation_ar from '__tmpdata/navigation_ar';

import CloseSVG from 'js/svg/Close';
import citySealImg from 'images/coa_seal.png';

//TODO: temp fix for i18n nav items -- remove once date is collected via graphql
const i18nNavigations = {
  'en': navigation_en,
  'es': navigation_es,
  'vi': navigation_vi,
  'ar': navigation_ar
};

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
      openSection: null,
    };
  }

  focusOnClose = () => {
    this.refs.closeTrigger && this.refs.closeTrigger.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.focusOnClose();
    }
  }

  toggleSublist = (e, openSectionId) => {
    if (e.type === "keydown" && e.key !== 'Enter') return false;
    if (openSectionId === this.state.openSection) {
      this.setState({
        openSection: null
      })
    } else {
      this.setState({
        openSection: openSectionId,
      })
    }
  }

  render() {
    const { allThemes } = i18nNavigations[this.context.langCode].data;

    return allThemes.edges.length && (
      <div className="container-fluid wrapper">
        <nav className={`coa-Menu ${this.props.isOpen ? 'coa-Menu--open' : ''}`} role="navigation">
          <button className="coa-Menu__close-btn d-lg-none"
            onClick={this.props.toggleMenu}
            ref="closeTrigger"
            tabIndex="0"
          >
            <CloseSVG size="40" />
          </button>
          <ul className="coa-Menu__list">
            <HomeMobileListItem handleClick={this.props.toggleMenu} />
            <AirportMobileListItem />
            <ThreeOneOneMobileListItem />
        {
          allThemes.edges.map(({node: theme}, i) => (
            <MenuItem key={i} id={i} {...this.state}
              theme={theme}
              handleMenuToggle={this.props.toggleMenu}
              handleSublistToggle={this.toggleSublist}
            />
          ))
        }
            <PrivacyPolicyListItem />
            <MobileFooter />
          </ul>
        </nav>
        {
          !!this.state.openSection && (
            <div className="coa-Menu__overlay"
              onClick={() => this.setState({ openSection: null })}
            ></div>
          )
        }
      </div>
    );
  }
}

//TODO: temp fix for i18n nav items -- remove once date is collected via graphql
Menu.contextTypes = {
  langCode: PropTypes.string,
}

const HomeMobileListItem = injectIntl(({handleClick, intl}) => (
  <li onClick={handleClick}
    className="coa-MenuItem--home coa-MenuItem coa-MenuItem--small d-lg-none"
  >
    <I18nNavLink to="/" exact>
      {intl.formatMessage(i18nMessages.home)}
    </I18nNavLink>
  </li>
))

const AirportMobileListItem = injectIntl(({intl}) => (
  <li className="coa-MenuItem coa-MenuItem--small d-lg-none">
    {/* tel aria guidance from: http://thatdevgirl.com/blog/accessibility-phone-number-formatting */}
    <ExternalLink to="http://www.austintexas.gov/airport" aria-label="3 1 1.">
      {intl.formatMessage(i18nMessages.airport)}
    </ExternalLink>
  </li>
))

const ThreeOneOneMobileListItem = injectIntl(({intl}) => (
  <li className="coa-MenuItem coa-MenuItem--small d-lg-none">
    <a href="tel:311">
      {intl.formatMessage(i18nMessages.call311)}
    </a>
    &nbsp;or&nbsp;
    <ExternalLink to="http://311.austintexas.gov/">
      {intl.formatMessage(i18nMessages.online311)}
    </ExternalLink>
  </li>
))

const PrivacyPolicyListItem = injectIntl(({intl}) => (
  <li className="coa-MenuItem coa-MenuItem--small d-lg-none">
    <a href="#">
      {intl.formatMessage(i18nMessages.privacy)}
    </a>
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

export default Menu;
