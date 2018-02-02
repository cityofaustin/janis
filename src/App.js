import React, { Component } from 'react'
import { Router, Route } from 'react-static'
import Routes from 'react-static-routes'
import { IntlProvider } from 'react-intl'
import locale from 'browser-locale'
import Cookies from 'js-cookie'
import ReactGA from 'react-ga'
import GoogleAnalyticsPageView from 'js/helpers/GoogleAnalyticsPageView'

// page_sections
import LanguageSelectBanner from "js/page_sections/LanguageSelectBanner"
import Header from "js/page_sections/Header"
import Footer from "js/page_sections/Footer"


import { SUPPORTED_LANGUAGES } from 'js/constants/languages'



import 'css/coa.css'

ReactGA.initialize('UA-110716917-2', { debug: true });


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: this.setLanguage()
    }
    this.daysUntilCookieExpires = 10 * 365;
  }

  parseBrowserLanguageCode = () => {
    // Normally, we only want the two letter lowercased language abbreviation
    // bc we aren't worried about locale (ex: en-US vs. en-UK) at this point,
    // just language.
    const twoLetterLangCode = locale().split('-')[0].toLowerCase();
    // But we do want to support two types of Chinese (zh-tw & zh-cn)
    const isChinese = twoLetterLangCode === 'zh';
    return isChinese ? locale().toLowerCase() : twoLetterLangCode;
  }

  setLanguage = () => {
    const cookieLanguage = Cookies.get('lang');
    const browserLocale = this.parseBrowserLanguageCode();
    let language = '';

    const isLanguageCodeInPath = SUPPORTED_LANGUAGES
      .map(lang => lang.code)
      .includes(this.props.urlPathLanguage)

    if (isLanguageCodeInPath) {
      language = this.props.urlPathLanguage
    } else if (cookieLanguage) {
      language = cookieLanguage
    } else {
      language = browserLocale || 'en'
    }

    Cookies.set('lang', language, { expires: this.daysUntilCookieExpires })
    return language
  }


  handleLanguageUpdate = (newLang) => {
    Cookies.set('lang', newLang, { expires: this.daysUntilCookieExpires })
    this.setState({ lang: newLang })
  }

  render() {
    return (
      <IntlProvider locale={this.state.lang}>
        <Router>
          <div>
            <Route path="/" component={GoogleAnalyticsPageView} />
            <Route path={`/:lang?`}
              render={(props) => {
                return (
                  <div>
                    <section>
                      <LanguageSelectBanner {...props} 
                        updateLanguage={this.handleLanguageUpdate}
                      />
                      <Header {...props} />
                    </section>
                    <section className="coa-main">
                      <Routes/>
                    </section>
                    <Footer />
                  </div>
                )
              }}
            />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
