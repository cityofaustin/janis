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

import { usePopoverState, Popover, PopoverDisclosure } from 'reakit/Popover';

import NavMenu from '../Menu/NavMenu';

const Header = ({ intl, navigation, path }) => {
  const govSitePopover = usePopoverState();
  const navMenuPopover = usePopoverState();

  return (
    <header
      className={classNames('coa-Header', {
        'coa-Header--menu-is-open': false,
      })}
      role="banner"
    >
      <div className="coa-Header--container">
        <PopoverDisclosure {...govSitePopover}>
          <GovSite menuIsOpen={govSitePopover.visible} />
        </PopoverDisclosure>
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
                (false ? 'coa-Header__center-controls--active' : null)
              }
            >
              <a className="coa-Header__menuIcon">
                {false ? (
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
        <Popover {...govSitePopover} aria-label="How you know menu">
          <HowYouKnowMenu />
        </Popover>
        <NavMenu navigation={navigation} navMenuPopover={navMenuPopover} />
      </div>
    </header>
  );
};

Header.propTypes = {
  navigation: PropTypes.arrayOf(themePropTypes).isRequired,
  path: PropTypes.string.isRequired,
};

export default injectIntl(Header);
