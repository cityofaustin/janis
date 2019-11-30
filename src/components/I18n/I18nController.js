import React from 'react';
import PropTypes from 'prop-types';
import { Routes } from 'react-static';
import { IntlProvider } from 'react-intl';
import locale from 'browser-locale';
import Cookies from 'js-cookie';
import { find } from 'lodash';

import localeMessages from 'js/i18n/loadLocaleData';
import {
  SUPPORTED_LANG_CODES,
  LANG_COOKIE_NAME,
  LANG_COOKIE_EXPIRES,
  DEFAULT_LANG,
} from 'js/i18n/constants';
import I18nDecorator from 'components/I18n/I18nDecorator';

// Check if lang is among our supported languages
const getSupportedLang = (lang) => {
  return SUPPORTED_LANG_CODES.find(validLang => validLang === lang);
}

const persistLang = (lang) => {
  Cookies.set(LANG_COOKIE_NAME, lang, { expires: LANG_COOKIE_EXPIRES });
}

const getLangFromCookie = (path) => {
  if (typeof document === 'undefined') return null;
  const lang = getSupportedLang(Cookies.get(LANG_COOKIE_NAME));
  if (!lang) {
    //if not a supported lang, remove cookie
    Cookies.remove(LANG_COOKIE_NAME);
    return null;
  }

  if (lang === DEFAULT_LANG) {
    persistLang(lang);
  } else {
    window.location.href = `/${lang}/${path || ''}`;
  }
  return lang
}

const getLangFromLocale = (path) => {
  if (typeof document === 'undefined') return null;
  const lang = getSupportedLang(
    locale()
      .split('-')[0]
      .toLowerCase()
  );

  if (!lang) return null;
  if (lang !== DEFAULT_LANG) {
    window.location.href = `/${lang}/${path || ''}`;
  }
  return lang
}

const I18nController = ({lang, path, children}) => {
  lang = getSupportedLang(lang);
  if (lang) {
    persistLang(lang);
  } else {
    lang = getLangFromCookie(path);
    if (!lang) {
      lang = getLangFromLocale(path);
      if (!lang) {
        lang = DEFAULT_LANG;
      }
    }
  }

  return (
    <IntlProvider
      locale={lang}
      messages={localeMessages[lang]}
      defaultLocale={DEFAULT_LANG}
    >
      <I18nDecorator>{children}</I18nDecorator>
    </IntlProvider>
  );
}

I18nController.propTypes = {
  children: PropTypes.node.isRequired,
  lang: PropTypes.string,
  path: PropTypes.string,
};

export default I18nController;
