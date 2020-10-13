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
    props.navigation.map(theme => {
      theme.text = theme.text.split('and').join('&')
    })
  }

  return (
    <nav
      className={classNames('coa-ThemesNav', {
        'coa-ThemesNav--open': props.isTopMenuActive,
      })}
    >

      <ul className="coa-ThemesNav__list">
        {props.navigation.map((theme, index) => (
          <span>
            <li
              className="coa-ThemesNav__theme"
              key={index}
              tabIndex="0"
              onKeyDown={props.handleOnClick}
            >
              <a
                className={"coa-ThemesNav__link " + lang + (theme.slug === props.slug ? " active" : "") }
                onClick={props.handleOnClick}
                slug={theme.slug}
              >
                {theme.text}
              </a>
            </li>
          </span>
        ))}
      </ul>

      <div className="coa-ThemesNav__right-controls">

        <div>
          <ExternalLink
            to="http://311.austintexas.gov/"
            ariaLabel={'three one one'}
          >311</ExternalLink>
        </div>

        <div>
          <ExternalLink
            to="http://www.austintexas.gov/airport"
            ariaLabel={intl.formatMessage(i18n.airport)}
          >{intl.formatMessage(i18n.airport)}</ExternalLink>
        </div>

      </div>

    </nav>
  )
}

ThemesNav.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default injectIntl(ThemesNav);
