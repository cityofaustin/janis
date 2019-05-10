import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const ThemesNav = props => (
  <nav className="coa-ThemesNav">
    <ul className="coa-ThemesNav__list">
      {props.themes[props.intl.locale].map((theme, index) => (
        <li className="coa-ThemesNav__theme" key={index} tabindex="0" onKeyPress={props.handleOnClick}>
          <a className="coa-ThemesNav__link" onClick={props.handleOnClick} >
            {theme.text}
          </a>
        </li>
      ))}
    </ul>
    {props.isTopMenuActive ? (
      <a
        className="coa-FullSiteMenu__close"
        tabindex="0"
        onClick={props.handleFullSiteMenuClose}
        onKeyPress={props.handleFullSiteMenuClose}
      >
        <i className="material-icons">close</i>
      </a>
    ) : null}
  </nav>
);

ThemesNav.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  themes: PropTypes.object.isRequired,
};

export default injectIntl(ThemesNav);
