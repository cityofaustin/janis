import React, { Component } from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
import { IntlProvider } from 'react-intl'
import locale from 'browser-locale'
import Cookies from 'js-cookie'

// page_sections
import LanguageSelectBanner from "js/page_sections/LanguageSelectBanner"
import Header from "js/page_sections/Header"
import Footer from "js/page_sections/Footer"
import { SUPPORTED_LANG_CODES, DAYS_UNTIL_LANG_COOKIE_EXPIRES, DEFAULT_LANG } from 'js/constants/languages'

class LanguageWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lang: this.setLanguage()
    }
  }

  setLanguage() {

    const getLang = [this.getLangFromProps, this.getLangFromCookie, this.getLangFromLocale, this.getDefaultLang];
    const that = this;

    return getLang.reduce((lang, fn) => {
      if(!lang) return fn.call(that);
      return lang;
    }, null)
  }

  getSupportedLang(lang) {
    return SUPPORTED_LANG_CODES.find( (val) => val===lang );
  }

  getDefaultLang() {
    return DEFAULT_LANG;
  }

  getLangFromProps(props) {
    props = props || this.props;
    const lang = this.getSupportedLang(props.match.params.lang);

    if(!lang) return null;

    Cookies.set('lang', lang, { expires: DAYS_UNTIL_LANG_COOKIE_EXPIRES })
    return lang;
  }

  getLangFromCookie() {
    if (typeof document === 'undefined') return null;

    const lang = this.getSupportedLang(Cookies.get('lang'));

    if(!lang) return null;

    if(lang === DEFAULT_LANG) {
      Cookies.set('lang', lang, { expires: DAYS_UNTIL_LANG_COOKIE_EXPIRES })
      return lang;
    }

    window.location.href=`/${lang}/${this.props.match.params.path || ''}`;
  }

  getLangFromLocale() {
    if (typeof document === 'undefined') return null;

    const lang = this.getSupportedLang(locale().split('-')[0].toLowerCase());
    // MVP does not need to include support for two types of Chinese (zh-tw & zh-cn)
    // const isChinese = twoLetterLangCode === 'zh';
    // return isChinese ? locale().toLowerCase() : twoLetterLangCode;

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

    return (
      <IntlProvider locale={this.state.lang}>
        <Router>
          <div>
            <section>
              <LanguageSelectBanner lang={this.state.lang} path={this.props.match.params.path || ''}/>
              <Header />
            </section>
            <section className="coa-main">
              <Routes/>
            </section>
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    );
  }

}

export default LanguageWrapper;
