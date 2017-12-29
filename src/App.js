import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// components
import Banner from "components/layout/Banner"
import I18nBanner from "components/I18nBanner"
import Header from "components/layout/Header"
import Footer from "components/layout/Footer"

// page routes
import HomePage from "pages/HomePage"
import ServicesIndex from "pages/Services"
import Service from "pages/Service"

import 'css/coa.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Banner />
          <I18nBanner />
          <section className="coa-main">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/services" component={ServicesIndex} />
            <Route path="/service/:id" component={Service} />
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
