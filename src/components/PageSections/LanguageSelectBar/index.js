import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';

const LanguageChevron = ({ showMessage, pending, selected }) =>
  pending && selected ? (
    <i className="material-icons coa-LanguageChevron">
      {showMessage ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
    </i>
  ) : null;

const LanguageSelectBar = ({
  path,
  intl,
  showMessage,
  togglePendingTranslation,
}) => (
  <>
    <div
      className={classNames('coa-LanguageSelectBar__background', {
        'coa-LanguageSelectBar__background--active': showMessage,
      })}
    />
    <div className="coa-LanguageSelectBar">
      <ul
        className={classNames('coa-LanguageSelectBar__list', {
          'coa-LanguageSelectBar__list--showMessage': showMessage,
        })}
      >
        {SUPPORTED_LANGUAGES.map(({ title, abbr, code, pending }, i) => {
          return (
            <li key={i} onClick={pending && togglePendingTranslation}>
              <a
                href={`/${code}/${path}${typeof window !== 'undefined' ? window.location.hash : ""}`}
                className={classNames('coa-LanguageSelectBar__item', {
                  'coa-LanguageSelectBar__item--active': intl.locale === code,
                  'coa-LanguageSelectBar__item--showMessage': showMessage,
                  'coa-LanguageSelectBar__item--activeMessage':
                    showMessage && intl.locale === code,
                })}
              >
                {title}{' '}
                <LanguageChevron
                  pending={pending}
                  selected={code === intl.locale}
                  showMessage={showMessage}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </>
);

LanguageSelectBar.propTypes = {
  path: PropTypes.string.isRequired,
};

export default injectIntl(LanguageSelectBar);
