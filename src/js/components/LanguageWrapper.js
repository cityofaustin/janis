import React, { Component } from 'react'
import Routes from 'react-static-routes'
import { IntlProvider } from 'react-intl'
import locale from 'browser-locale'
import Cookies from 'js-cookie'

// page_sections
import LanguageSelectBanner from "js/page_sections/LanguageSelectBanner"
import Header from "js/page_sections/Header"
import Footer from "js/page_sections/Footer"
import { SUPPORTED_LANG_CODES, LANG_COOKIE_NAME, LANG_COOKIE_EXPIRES, DEFAULT_LANG } from 'js/constants/languages'

class LanguageWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lang: this.getInitialLangState()
    }
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
    return (
      <IntlProvider locale={lang}>
        <div style={{ position: 'relative' }}>
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

export default LanguageWrapper;
