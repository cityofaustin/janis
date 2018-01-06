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

import SUPPORTED_LANGUAGES from 'constants/languages'

class LanguageWrapper extends Component {
  setLanguage = () => {
    let language = 'en'
    const daysUntilCookieExpires = 7
    const isLanguageCodeInPath = SUPPORTED_LANGUAGES
      .map(lang => lang.code)
      .includes(this.props.urlPathLanguage)

    language = isLanguageCodeInPath ? this.props.urlPathLanguage : locale()

    Cookies.set('lang', language, { expires: daysUntilCookieExpires })
    return language
  }

  render() {
    return (
      <IntlProvider locale={this.setLanguage()}>
        <Router>
          <div>
            <Route path="/" render={props => (
              <section>
                <Banner />
                <I18nBanner activeLanguage={this.setLanguage()} {...props} />
                <Header {...props} />
              </section>
            )} />
            <section className="coa-main">
              <Route exact path={`/`} component={HomePage} />
              <Route exact path={`/:lang?/services`} component={ServicesIndex} />
              <Route exact path={`/:lang?/search`} component={SearchPage} />
              <Route path={`/:lang?/service/:id`} component={Service} />
            </section>
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    );
  }

}

export default LanguageWrapper;
