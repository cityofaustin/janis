import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const ThemesNav = props => {
  return (
    <nav className="coa-ThemesNav">
      <ul className="coa-ThemesNav__list">
        {props.themes[props.intl.locale].map((theme, index) => (
          <li className="coa-ThemesNav__theme" key={index}>
            <a className="coa-ThemesNav__link" onClick={props.handleOnClick}>
              {theme.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

ThemesNav.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  themes: PropTypes.object.isRequired,
};

export default injectIntl(ThemesNav);
