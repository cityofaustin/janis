import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withSiteData } from 'react-static';
import Routes from 'react-static-routes';
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
import SkipToMain from 'components/PageSections/SkipToMain';
import LanguageSelectBar from 'components/PageSections/LanguageSelectBar';
import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';

class I18nController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: this.getInitialLangState(),
    };
  }

  getInitialLangState() {
    const getLang = [
      this.getLangFromProps,
      this.getLangFromCookie,
      this.getLangFromLocale,
      () => DEFAULT_LANG,
    ];
    const that = this;

    return getLang.reduce((lang, fn) => {
      if (!lang) return fn.call(that);
      return lang;
    }, null);
  }

  persistLang(lang) {
    Cookies.set(LANG_COOKIE_NAME, lang, { expires: LANG_COOKIE_EXPIRES });
  }

  getSupportedLang(langToCheck) {
    return SUPPORTED_LANG_CODES.find(lang => lang === langToCheck);
  }

  getLangFromProps(props) {
    props = props || this.props;
    const lang = this.getSupportedLang(props.match.params.lang);

    if (!lang) return null;
    //TODO: if not supported, redirect to path without lang

    this.persistLang(lang);
    return lang;
  }

  getLangFromCookie() {
    if (typeof document === 'undefined') return null;

    const lang = this.getSupportedLang(Cookies.get(LANG_COOKIE_NAME));

    if (!lang) return null;
    //TODO: if not supported, unset cookie

    if (lang === DEFAULT_LANG) {
      this.persistLang(lang);
      return lang;
    }

    window.location.href = `/${lang}/${this.props.match.params.path || ''}`;
  }

  getLangFromLocale() {
    if (typeof document === 'undefined') return null;

    const lang = this.getSupportedLang(
      locale()
        .split('-')[0]
        .toLowerCase(),
    );

    if (!lang) return null;

    if (lang === DEFAULT_LANG) {
      return lang;
    }

    window.location.href = `/${lang}/${this.props.match.params.path || ''}`;
  }

  componentWillReceiveProps(nextProps) {
    const lang = this.getLangFromProps(nextProps);
    if (lang && lang !== this.state.lang) this.setState({ lang: lang });
  }

  render() {
    const { lang } = this.state;
    const { threeoneone, navigation, match } = this.props;
    const messages = localeMessages[lang];

    return (
      <IntlProvider
        locale={lang}
        messages={messages}
        defaultLocale={DEFAULT_LANG}
        textComponent={Fragment}
        key={lang}
      >
        <I18nDecorator>
          <SkipToMain />
          <LanguageSelectBar path={match.params.path || ''} />
          <Header navigation={navigation[lang]} />
          <main role="main" id="main">
            <Routes />
          </main>
          <Footer threeoneone={threeoneone[lang]} />
        </I18nDecorator>
      </IntlProvider>
    );
  }
}

I18nController.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withSiteData(I18nController);
