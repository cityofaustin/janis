import React, { Component } from 'react'
import Routes from 'react-static-routes'
import locale from 'browser-locale'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

// react-intl i18n
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'
import vi from 'react-intl/locale-data/vi'
import ar from 'react-intl/locale-data/ar'
import messages_en from 'js/i18n/locales/en.json';
import messages_es from 'js/i18n/locales/es.json';
import messages_vi from 'js/i18n/locales/vi.json';
import messages_ar from 'js/i18n/locales/ar.json';
import { SUPPORTED_LANG_CODES, LANG_COOKIE_NAME, LANG_COOKIE_EXPIRES, DEFAULT_LANG } from 'js/i18n/constants'
addLocaleData([...en, ...es, ...vi, ...ar]);
const localeMessages = {
  'en': messages_en,
  'es': messages_es,
  'vi': messages_vi,
  'ar': messages_ar
};

// page_sections
import LanguageSelectBar from "js/page_sections/LanguageSelectBar"
import Header from "js/page_sections/Header"
import Footer from "js/page_sections/Footer"

class LanguageWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lang: this.getInitialLangState()
    }
  }

  getChildContext() {
    return {
      langCode: this.state.lang
    };
  }

  getInitialLangState() {
    const getLang = [ this.getLangFromProps, this.getLangFromCookie, this.getLangFromLocale, ()=>DEFAULT_LANG ];
    const that = this;

    return getLang.reduce((lang, fn) => {
      if(!lang) return fn.call(that);
      return lang;
    }, null)
  }

  persistLang(lang) {
    Cookies.set(LANG_COOKIE_NAME, lang, { expires: LANG_COOKIE_EXPIRES });
  }

  getSupportedLang(langToCheck) {
    return SUPPORTED_LANG_CODES.find( (lang) => lang===langToCheck );
  }

  getLangFromProps(props) {
    props = props || this.props;
    const lang = this.getSupportedLang(props.match.params.lang);

    if(!lang) return null;
    //TODO: if not supported, redirect to path without lang

    this.persistLang(lang);
    return lang;
  }

  getLangFromCookie() {
    if (typeof document === 'undefined') return null;

    const lang = this.getSupportedLang(Cookies.get(LANG_COOKIE_NAME));

    if(!lang) return null;
    //TODO: if not supported, unset cookie

    if(lang === DEFAULT_LANG) {
      this.persistLang(lang);
      return lang;
    }

    window.location.href=`/${lang}/${this.props.match.params.path || ''}`;
  }

  getLangFromLocale() {
    if (typeof document === 'undefined') return null;

    const lang = this.getSupportedLang(locale().split('-')[0].toLowerCase());

    if(!lang) return null;

    if(lang === DEFAULT_LANG) {
      return lang;
    }

    window.location.href=`/${lang}/${this.props.match.params.path || ''}`;
  }

  componentWillReceiveProps(nextProps) {
    const lang = this.getLangFromProps(nextProps);
    if(lang && lang !== this.state.lang) this.setState({lang: lang});
  }

  render() {
    const { lang } = this.state;
    const messages = localeMessages[lang];
    // Right to Left Direction for arabic text
    const direction = lang === 'ar' ? 'rtl' : 'ltr';

    return (
      <IntlProvider locale={lang} messages={messages} defaultLocale={DEFAULT_LANG} key={lang}>
        <div style={{ position: 'relative' }} dir={direction} className={direction}>
          <a href="#main" className="usa-skipnav">Skip to main content</a>
          <LanguageSelectBar lang={lang} path={this.props.match.params.path || ''}/>
          <Header />
          <main role="main" id="main">
            <Routes />
          </main>
          <Footer />
        </div>
      </IntlProvider>
    );
  }
}

LanguageWrapper.childContextTypes = {
  langCode: PropTypes.string
}

export default LanguageWrapper;
