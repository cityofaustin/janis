import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import I18nNavLink from 'js/modules/I18nNavLink';
import ExternalLink from 'js/modules/ExternalLink';
import MenuItem from 'js/page_sections/Menu/MenuItem';
import navigation from '__tmpdata/navigation';

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
  footer: {
    id: 'Menu.MobileFooter.text',
    defaultMessage: 'Alpha.austin.gov is a work in progress. For the full City of Austin website, visit ',
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
    const { intl } = this.props;
    const { allThemes } = navigation.data;

    return allThemes.edges.length && (
      <div className="wrapper">
        <nav className={`coa-Menu ${this.props.isOpen ? 'coa-Menu--open' : ''}`} role="navigation">
          <button className="coa-Menu__close-btn d-lg-none"
            onClick={this.props.toggleMenu}
            ref="closeTrigger"
            tabIndex="0"
          >
            <CloseSVG size="40" />
          </button>
          <ul className="coa-Menu__list">
            <HomeMobileListItem handleClick={this.props.toggleMenu} intl={intl} />
            <AirportMobileListItem intl={intl} />
            <ThreeOneOneMobileListItem intl={intl} />
        {
          allThemes.edges.map(({node: theme}, i) => (
            <MenuItem id={i} {...this.state}
              theme={theme}
              handleMenuToggle={this.props.toggleMenu}
              handleSublistToggle={this.toggleSublist}
            />
          ))
        }
            <PrivacyPolicyListItem intl={intl} />
            <MobileFooter intl={intl} />
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

const HomeMobileListItem = ({handleClick, intl}) => (
  <li onClick={handleClick}
    className="coa-MenuItem--home coa-MenuItem coa-MenuItem--small d-lg-none"
  >
    <I18nNavLink to="/" exact>
      {intl.formatMessage(i18nMessages.home)}
    </I18nNavLink>
  </li>
)

const AirportMobileListItem = ({intl}) => (
  <li className="coa-MenuItem coa-MenuItem--small d-lg-none">
    {/* tel aria guidance from: http://thatdevgirl.com/blog/accessibility-phone-number-formatting */}
    <ExternalLink to="http://www.austintexas.gov/airport" aria-label="3 1 1.">
      {intl.formatMessage(i18nMessages.airport)}
    </ExternalLink>
  </li>
)

const ThreeOneOneMobileListItem = ({intl}) => (
  <li className="coa-MenuItem coa-MenuItem--flex coa-MenuItem--small d-lg-none">
    <a href="tel:311">
      {intl.formatMessage(i18nMessages.call311)}
    </a>
    &nbsp;or&nbsp;
    <ExternalLink to="http://311.austintexas.gov/">
      {intl.formatMessage(i18nMessages.online311)}
    </ExternalLink>
  </li>
)

const PrivacyPolicyListItem = ({intl}) => (
  <li className="coa-MenuItem coa-MenuItem--small d-lg-none">
    <a href="#">
      {intl.formatMessage(i18nMessages.privacy)}
    </a>
  </li>
)

const MobileFooter = ({intl}) => (
  <div className="coa-Menu__mobile-footer">
    <p className="coa-Menu__footer-text d-lg-none">
      {intl.formatMessage(i18nMessages.footer)}<ExternalLink to="https://austintexas.gov">austintexas.gov</ExternalLink>.
    </p>
    <img className="d-lg-none" src={citySealImg} alt={intl.formatMessage(i18nMessages.sealAltText)} />
  </div>
)

export default injectIntl(Menu);
