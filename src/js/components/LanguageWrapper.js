import React, { Component } from 'react'
import Routes from 'react-static-routes'
import { IntlProvider } from 'react-intl'
import locale from 'browser-locale'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import moment from 'moment';
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'
import fr from 'react-intl/locale-data/fr'

//TODO: maybe change where this aggregated file lives
//or maybe it shouldn't be aggregates?
// import localeData from 'js/i18n/locales/data.json';

import { SUPPORTED_LANG_CODES, LANG_COOKIE_NAME, LANG_COOKIE_EXPIRES, DEFAULT_LANG } from 'js/i18n/constants'

// page_sections
import LanguageSelectBanner from "js/page_sections/LanguageSelectBanner"
import Header from "js/page_sections/Header"
import Footer from "js/page_sections/Footer"

addLocaleData([...en, ...es, ...fr]);

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
    // const messages = localeData[lang];
    moment.locale(lang);

    return (
      <IntlProvider locale={lang} defaultLocale={DEFAULT_LANG} key={lang}>
        <div>
          <LanguageSelectBanner lang={lang} path={this.props.match.params.path || ''}/>
          <Header />
            <section className="coa-main">
              <Routes />
            </section>
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
