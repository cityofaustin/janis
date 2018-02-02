import React, { Component } from 'react'
import { Router, Route } from 'react-static'

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
                <div>
                  <section>
                    <I18nBanner {...props} />
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
        </Router>
    );
  }
}

export default App;
