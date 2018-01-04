import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// components
import Banner from "components/layout/Banner"
import I18nBanner from "components/layout/I18nBanner"
import Header from "components/layout/Header"
import Footer from "components/layout/Footer"

// page routes
import HomePage from "js/pages/HomePage"
import SearchPage from "js/pages/SearchPage"
import ServicesIndex from "js/pages/Services"
import Service from "js/pages/Service"

import 'css/coa.css'

class App extends Component {
  render() {
    return (
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
            <Route exact path="/" component={HomePage} />
            <Route exact path="/services" component={ServicesIndex} />
            <Route exact path="/search" component={SearchPage} />
            <Route path="/service/:id" component={Service} />
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
