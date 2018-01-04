import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// components
import Banner from "js/layout/Banner"
import I18nBanner from "js/layout/I18nBanner"
import Header from "js/layout/Header"
import Footer from "js/layout/Footer"

// page routes
import Home from "js/pages/Home"
import Search from "js/pages/Search"
import Services from "js/pages/Services"
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
            <Route exact path="/" component={Home} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/search" component={Search} />
            <Route path="/service/:id" component={Service} />
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
