import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { misc as i18n1, navigation as i18n2 } from 'js/i18n/definitions';

import WorkInProgress from 'components/WorkInProgress';
import ThreeOneOneRequest from 'components/PageSections/ThreeOneOne/ThreeOneOneRequest';
import I18nNavLink from 'components/I18n/I18nNavLink';
import ExternalLink from 'components/ExternalLink';
import CloseSVG from 'components/SVGs/Close';
import citySealImg from 'images/coa_seal.png';

import MenuItem from './MenuItem';
import { themePropTypes } from './proptypes';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSubmenuId: null,
    };
  }

  focusOnClose = () => {
    this.refs.closeTrigger && this.refs.closeTrigger.focus();
  };

  componentDidUpdate(prevProps) {
    if (this.props.isMenuOpen && !prevProps.isMenuOpen) {
      this.focusOnClose();
    }
  }

  isSubmenuOpen = id => this.state.openSubmenuId === id;

  closeAllMenus = e => {
    this.props.closeMenu();
    this.setState({
      openSubmenuId: null,
    });
  };

  toggleSubmenu = (e, openSubmenuId) => {
    if (e.type === 'keydown' && e.key !== 'Enter') return false;
    if (openSubmenuId === this.state.openSubmenuId) {
      this.setState({
        openSubmenuId: null,
      });
    } else {
      this.setState({
        openSubmenuId: openSubmenuId,
      });
    }
  };

  render() {
    const { isMenuOpen, navigation } = this.props;
    const { openSubmenuId } = this.state;

    return (
      <div className="container-fluid wrapper">
        <nav
          className={classNames('coa-Menu', { 'coa-Menu--open': isMenuOpen })}
          role="navigation"
        >
          <button
            className="coa-Menu__close-btn d-lg-none"
            onClick={this.closeAllMenus}
            ref="closeTrigger"
            tabIndex="0"
          >
            <CloseSVG />
          </button>
          <ul className="coa-Menu__list">
            <HomeMobileMenuItem handleCloseAllMenus={this.closeAllMenus} />
            <AirportMobileMenuItem />
            <ThreeOneOneMobileMenuItem />
            {navigation.map((theme, i) => (
              <MenuItem
                key={i}
                id={i}
                theme={theme}
                isSubmenuOpen={this.isSubmenuOpen(i)}
                handleCloseAllMenus={this.closeAllMenus}
                handleSubmenuToggle={this.toggleSubmenu}
              />
            ))}
            <PrivacyPolicyMenuItem handleCloseAllMenus={this.closeAllMenus} />
            <MobileFooter />
          </ul>
        </nav>
        {/*
          this provides a full page click target area behind the nav menu
          which, when clicked, will close the submenu
        */
        openSubmenuId !== null && (
          <div
            className="coa-Menu__close-submenu-click-target"
            onClick={() => this.setState({ openSubmenuId: null })}
          />
        )}
      </div>
    );
  }
}

const HomeMobileMenuItem = injectIntl(({ handleCloseAllMenus, intl }) => (
  <div className="d-lg-none" onClick={handleCloseAllMenus}>
    <div className="coa-MenuItem coa-MenuItem--small coa-MenuItem--home">
      <I18nNavLink to="/" exact>
        {intl.formatMessage(i18n2.home)}
      </I18nNavLink>
    </div>
  </div>
));

const AirportMobileMenuItem = injectIntl(({ intl }) => (
  <div className="d-lg-none">
    <div className="coa-MenuItem coa-MenuItem--small">
      <ExternalLink to="http://www.austintexas.gov/airport">
        {intl.formatMessage(i18n1.airport)}
      </ExternalLink>
    </div>
  </div>
));

const ThreeOneOneMobileMenuItem = () => (
  <div className="d-lg-none">
    <div className="coa-MenuItem coa-MenuItem--small">
      <ThreeOneOneRequest />
    </div>
  </div>
);

const PrivacyPolicyMenuItem = injectIntl(({ handleCloseAllMenus, intl }) => (
  <div className="d-lg-none" onClick={handleCloseAllMenus}>
    <div className="coa-MenuItem coa-MenuItem--small">
      <a href="#">{intl.formatMessage(i18n1.privacy)}</a>
    </div>
  </div>
));

const MobileFooter = injectIntl(({ intl }) => (
  <div className="d-lg-none">
    <div className="coa-Menu__footer">
      <p>
        <WorkInProgress />
      </p>
      <img src={citySealImg} alt={intl.formatMessage(i18n1.citySeal)} />
    </div>
  </div>
));

Menu.propTypes = {
  navigation: PropTypes.arrayOf(themePropTypes).isRequired,
  closeMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool,
};

export default injectIntl(Menu);
