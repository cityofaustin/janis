import React, { Component } from 'react'
import { Route, Router } from 'react-static'
import Routes from 'react-static-routes'
import { IntlProvider } from 'react-intl'
import locale from 'browser-locale'
import Cookies from 'js-cookie'
import { createBrowserHistory } from 'history'

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
    //TODO: if not supported, unset COOKIE

    if(lang === DEFAULT_LANG) {
      this.persistLang(lang);
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

    // const RenderRoutes = ({ getComponentForPath }) => (
    //   // The default renderer uses a catch all route to recieve the pathname
    //   <Route path='*' render={props => {
    //     const path = (this.state.lang) ? '/'+this.state.lang + props.location.pathname : props.location.pathname;
    //     const Comp = getComponentForPath(path);
    //     return <Comp {...props} />
    //   }} />
    // );

    const history = (typeof document !== 'undefined' && this.state.lang)
      ? createBrowserHistory({basename: '/'+this.state.lang})
      : null;

// console.log('history:', !!history );

    const children = (
      <div>
        <Header />
        <section className="coa-main">
          <Routes></Routes>
        </section>
        <Footer />
      </div>
    );

    const JSX = (history)
      ? <Router history={history}>{children}</Router>
      : <Router>{children}</Router>

    return (
      <IntlProvider locale={this.state.lang}>
        <div>
          <LanguageSelectBanner lang={this.state.lang} path={this.props.match.params.path || ''}/>
          {JSX}
        </div>
      </IntlProvider>
    );
  }
}

export default LanguageWrapper;
