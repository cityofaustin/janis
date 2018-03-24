import React from 'react';
import { NavLink } from 'react-static';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';

const LanguageSelectBar = ({path, lang}) => (
  <div className="coa-LanguageSelectBar">
    <div className="container-fluid wrapper">
      <div className="coa-LanguageSelectBar__language-list">
        {
          SUPPORTED_LANGUAGES.map(({title, abbr, code}, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={`/${code}/${path}`}
                  className="coa-LanguageSelectBar__language-item"
                  activeClassName="coa-LanguageSelectBar__language-item--active"
                >
                  {title}
                </NavLink>
              </li>
            )
          })
        }
      </div>
    </div>
  </div>
)

export default LanguageSelectBar;
