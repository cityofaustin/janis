import React, { Component } from 'react';
import { NavLink } from 'react-static';
import { find } from 'lodash';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';

const selectedLanguage = (lang) => find(SUPPORTED_LANGUAGES, {'code': lang});

const LanguageSelectBar = ({path, lang}) => (
  <div className="coa-LanguageSelectBar">
    <div className="container-fluid wrapper">
      <div className="coa-LanguageSelectBar__language-list">
        {
          SUPPORTED_LANGUAGES.map(({title, abbr, code}, i) => {
            if (selectedLanguage(lang).title === title) return false;
            return (
              <li key={i} className="coa-LanguageSelectBar__language-item">
                <NavLink to={`/${code}/${path}`} >
                  {title}
                </NavLink>
              </li>
            )
          })
        }
        <li className="coa-LanguageSelectBar__language-item coa-LanguageSelectBar__language-item--active">
          { selectedLanguage(lang).title }
        </li>
      </div>
    </div>
  </div>
)

export default LanguageSelectBar;
