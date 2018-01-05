import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import locale from 'browser-locale'

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

class LanguageWrapper extends Component {
  setLanguage = () => {
    const browserLocale = locale() || 'en'

    // TODO:
    // if there's no url language param
    //  use browser settings
    // if browser settings is null or outside our list
    //  return 'en'

    return this.props.urlPathLanguage
  }

  render() {
    return (
      <IntlProvider locale={this.setLanguage()}>
        <Router>
          <div>
            <Route path="/" render={props => (
              <section>
                <Banner />
                <I18nBanner />
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
