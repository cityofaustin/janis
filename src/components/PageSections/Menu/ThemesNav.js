import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ThemesNav = props => (
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
          <a className="coa-ThemesNav__link" onClick={props.handleOnClick}>
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

    <a href='/search' className="coa-ThemesNav__search-container">
      <i className="material-icons coa-ThemesNav__search-icon">search</i>
      <span className="coa-ThemesNav__search-title">
        Search
      </span>
    </a>

  </nav>
);

ThemesNav.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default injectIntl(ThemesNav);
