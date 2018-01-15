import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import locale from 'browser-locale'
import Cookies from 'js-cookie'

// page_sections
import Banner from "js/page_sections/Banner"
import I18nBanner from "js/page_sections/I18nBanner"
import Header from "js/page_sections/Header"
import Footer from "js/page_sections/Footer"

// pages
import Home from "js/pages/Home"
import Search from "js/pages/Search"
import Services from "js/pages/Services"
import Service from "js/pages/Service"
import Topic from "js/pages/Topic"
import Department from "js/pages/Department"

import { SUPPORTED_LANGUAGES } from 'js/constants/languages'

class LanguageWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: this.setLanguage()
    }
    this.daysUntilCookieExpires = 10 * 365;
  }

  setLanguage = () => {
    const cookieLanguage = Cookies.get('lang')
    let language = ''

    const isLanguageCodeInPath = SUPPORTED_LANGUAGES
      .map(lang => lang.code)
      .includes(this.props.urlPathLanguage)

    if (isLanguageCodeInPath) {
      language = this.props.urlPathLanguage
    } else if (cookieLanguage) {
      language = cookieLanguage
    } else {
      language = locale() || 'en'
    }

    Cookies.set('lang', language, { expires: this.daysUntilCookieExpires })
    return language
  }

  handleManualLanguageUpdate = (newLang) => {
    Cookies.set('lang', newLang, { expires: this.daysUntilCookieExpires })
    this.setState({ lang: newLang })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isLanguageChanged = nextState.lang !== this.state.lang
    if (isLanguageChanged) return true;
    return false;
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
              <Switch>
                <Route exact path={`/:lang?`} component={Home} {...this.props} />
                <Route exact path={`/:lang?/services`} component={Services} {...this.props} />
                <Route exact path={`/:lang?/topic/:id`} component={Topic} {...this.props} />
                <Route exact path={`/:lang?/department/:id`} component={Department} {...this.props} />
                <Route exact path={`/:lang?/search`} component={Search} {...this.props} />
                <Route path={`/:lang?/service/:slug`} render={(props) => <Service {...props} lang={this.state.lang}/>} />
              </Switch>
            </section>
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    );
  }

}

export default LanguageWrapper;
