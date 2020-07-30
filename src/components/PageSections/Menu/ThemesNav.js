import React from 'react';
import { injectIntl, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { misc as i18n } from 'js/i18n/definitions';
import ExternalLink from 'components/ExternalLink';

const ThemesNav = props => {

  const intl = useIntl();
  const lang = intl.locale

  if (lang === 'en') {
    props.navigation.map( theme => {
      theme.text = theme.text.split('and').join('&')
    })
  }

  console.log("ThemesNav props :", props)

  return (
    <nav
      className={classNames('coa-ThemesNav', {
        'coa-ThemesNav--open': props.isTopMenuActive,
      })}
    >
      <ul className="coa-ThemesNav__list">
        {props.navigation.map((theme, index) => (
          <li
            className="coa-ThemesNav__theme"
            key={index}
            tabIndex="0"
            onKeyDown={props.handleOnClick}
          >
            <a className={"coa-ThemesNav__link "+lang} onClick={props.handleOnClick}>
              {theme.text}
            </a>
          </li>
        ))}
      </ul>
      {props.isTopMenuActive ? (
        <a
          className="coa-FullSiteMenu__close"
          tabIndex="0"
          onClick={props.handleFullSiteMenuClose}
          onKeyDown={props.handleFullSiteMenuClose}
        >
          <i className="material-icons">close</i>
        </a>
      ) : null}



      <div className="coa-Header__right-controls-wrapper">

        <div className="coa-Header__right-controls">
          <ExternalLink
            to="http://311.austintexas.gov/"
            ariaLabel={'three one one'}
          >
            311
          </ExternalLink>

          {/*  Note that this class is in _Header.scss  */}
          <span className="coa-text-spacer--vertical" />
          <ExternalLink
            to="http://www.austintexas.gov/airport"
            ariaLabel={intl.formatMessage(i18n.airport)}
          >
            {intl.formatMessage(i18n.airport)}
          </ExternalLink>

        </div>
      </div>




    </nav>
  )
}

ThemesNav.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default injectIntl(ThemesNav);
