import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-static'

import LanguageWrapper from "js/components/LanguageWrapper"

// page_sections
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

import Routes from 'react-static-routes'


import 'css/coa.css'

class App extends Component {
  render() {
    return (
        <Router>
          <Route path={`/:lang?`}
            render={(props) => {
              return (
                // <LanguageWrapper {...props}
                //   urlPathLanguage={props.match.params.lang}
                // />
                <div>
                  <Route path="/" render={props => (
                    <section>
                      {/* <I18nBanner activeLanguage={this.state.lang} {...props}
                        handleManualLanguageUpdate={this.handleManualLanguageUpdate}
                      /> */}
                      <Header {...props} />
                    </section>
                  )} />
                  <section className="coa-main">
                    <Routes/>
                    <Switch>
                      {/* <Route exact path={`/:lang?`} component={Home} {...this.props} /> */}
                      {/* <Route exact path={`/:lang?/services`} component={Services} {...this.props} /> */}
                      <Route exact path={`/:lang?/topic/:id`} component={Topic} {...this.props} />
                      <Route exact path={`/:lang?/department/:id`} component={Department} {...this.props} />
                      <Route exact path={`/:lang?/search`} component={Search} {...this.props} />
                      <Route path={`/:lang?/service/:slug`} render={(props) => <Service {...props} />} />
                    </Switch>
                  </section>
                  <Footer />
                </div>
              )
            }}
          />
        </Router>
    );
  }
}

export default App;
