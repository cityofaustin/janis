import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Link } from '@reach/router';
import classNames from 'classnames';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';
import { getPath } from 'js/helpers/path';

const LanguageSelectBar = ({ intl }) => {
  let path = getPath();
  // Hacky thing here but let's see if it does the trick!
  if (path.substring(1, 3) === intl.locale) {
    path = path.substring(3);
  }

  return (
    <div className="coa-LanguageSelectBar">
      <ul className="coa-LanguageSelectBar__list">
        {SUPPORTED_LANGUAGES.map(({ title, abbr, code }, i) => (
          <li key={i}>
            <Link
              to={`${code}${path}`}
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
};

export default injectIntl(LanguageSelectBar);
