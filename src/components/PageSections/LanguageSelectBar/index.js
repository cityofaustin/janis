import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-static';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';

const LanguageSelectBar = ({ path, intl }) => (
  <div className="coa-LanguageSelectBar">
    <div className="container-fluid wrapper">
      <div className="coa-LanguageSelectBar__language-list">
        {SUPPORTED_LANGUAGES.map(({ title, abbr, code }, i) => {
          return (
            <li key={i}>
              <Link
                to={`/${code}/${path}`}
                className={`coa-LanguageSelectBar__language-item
                  ${
                    intl.locale === code
                      ? 'coa-LanguageSelectBar__language-item--active'
                      : ''
                  }`}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </div>
    </div>
  </div>
);

export default injectIntl(LanguageSelectBar);
