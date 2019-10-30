import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';

const LanguageSelectBar = ({ path, intl }) => (
  <div className="coa-LanguageSelectBar">
    <ul className="coa-LanguageSelectBar__list">
      {SUPPORTED_LANGUAGES.map(({ title, abbr, code }, i) => (
        <li key={i}>
          <Link
            to={`/${code}/${path}`}
            className={classNames('coa-LanguageSelectBar__item', {
              'coa-LanguageSelectBar__item--active': intl.locale === code,
            })}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

LanguageSelectBar.propTypes = {
  path: PropTypes.string.isRequired,
};

export default injectIntl(LanguageSelectBar);
