import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import locale from 'browser-locale'
import Cookies from 'js-cookie'

// components
import Banner from "components/layout/Banner"
import I18nBanner from "components/layout/I18nBanner"
import Header from "components/layout/Header"
import Footer from "components/layout/Footer"

// page routes
import HomePage from "pages/HomePage"
import SearchPage from "pages/SearchPage"
import ServicesIndex from "pages/Services"
import Service from "pages/Service"

import SUPPORTED_LANGUAGES from 'js/constants/languages'

class LanguageWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: this.setLanguage()
    }
    this.daysUntilCookieExpires = 7
  }

  setLanguage = () => {
    let language = 'en'
    const isLanguageCodeInPath = SUPPORTED_LANGUAGES
      .map(lang => lang.code)
      .includes(this.props.urlPathLanguage)

    language = isLanguageCodeInPath ? this.props.urlPathLanguage : locale()

    Cookies.set('lang', language, { expires: this.daysUntilCookieExpires })
    return language
  }

  handleManualLanguageUpdate = (newLang) => {
    Cookies.set('lang', newLang, { expires: this.daysUntilCookieExpires })
    this.setState({ lang: newLang })
  }

  render() {
    return (
      <IntlProvider locale={this.state.lang}>
        <Router>
          <div>
            <Route path="/" render={props => (
              <section>
                <Banner />
                <I18nBanner activeLanguage={this.state.lang} {...props}
                  handleManualLanguageUpdate={this.handleManualLanguageUpdate}
                />
                <Header {...props} />
              </section>
            )} />
            <section className="coa-main">
              <Route exact path={`/`} component={HomePage} {...this.props} />
              <Route exact path={`/:lang?/services`} component={ServicesIndex} {...this.props} />
              <Route exact path={`/:lang?/search`} component={SearchPage} {...this.props} />
              <Route path={`/:lang?/service/:slug`} component={Service} {...this.props} />
            </section>
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    );
  }

}

export default LanguageWrapper;
