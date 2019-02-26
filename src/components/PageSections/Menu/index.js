import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { misc as i18n1, navigation as i18n2, departmentPage as i18n3 } from 'js/i18n/definitions';

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
    const { isMenuOpen, navigation, intl } = this.props;
    const { openSubmenuId } = this.state;

    return (
      <div className="container-fluid wrapper">
        <nav
          className={classNames('coa-Menu', { 'coa-Menu--open': isMenuOpen })}
          role="navigation"
        >
          <div className="container-fluid wrapper">
            <div className="coa-Menu__header">
              <h2><a href={intl.formatMessage(i18n1.opoDeptUrl)}>{intl.formatMessage(i18n1.opoName)}</a></h2>
            </div>
            <div className="coa-Menu__subheading">{intl.formatMessage(i18n1.services)}</div>
            <div className="coa-Menu__link coa-Menu__service-link">
              <a href={intl.formatMessage(i18n3.complaintFormUrl)}>{intl.formatMessage(i18n3.complaintFormButtonText)}</a>
            </div>
            <div className="coa-Menu__link coa-Menu__service-link">
              <a href={intl.formatMessage(i18n3.thankFormUrl)}>{intl.formatMessage(i18n3.thankFormButtonText)}</a>
            </div>
            <div className="coa-DepartmentPage__topServiceButtons coa-Menu__serviceButtons-desktop">
              <a href={intl.formatMessage(i18n3.complaintFormUrl)} className="coa-DepartmentPage__topServiceButton">
                {intl.formatMessage(i18n3.complaintFormButtonText)}
              </a>
              <a href={intl.formatMessage(i18n3.thankFormUrl)} className="coa-DepartmentPage__topServiceButton">
                {intl.formatMessage(i18n3.thankFormButtonText)}
              </a>
            </div>
            <div className="coa-Menu__subheading">{intl.formatMessage(i18n1.info)}</div>
            <div className="coa-Menu__link">
              <a href={intl.formatMessage(i18n3.yourDataUrl)}>{intl.formatMessage(i18n3.yourDataLinkText)}</a>
            </div>
            <div className="coa-Menu__link">
              <a href={intl.formatMessage(i18n3.investigationProcessUrl)}>{intl.formatMessage(i18n3.investigationProcessLinkText)}</a>
            </div>
          </div>

        </nav>
      </div>
    );
  }
}

Menu.propTypes = {
  navigation: PropTypes.arrayOf(themePropTypes).isRequired,
  closeMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool,
};

export default injectIntl(Menu);
