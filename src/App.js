import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// components
import Banner from "components/Banner"
import I18nBanner from "components/I18nBanner"
import Header from "components/Header"
import Footer from "components/Footer"

// page routes
import HomePage from "pages/HomePage"
import SearchPage from "pages/SearchPage"
import ServicesIndex from "pages/Services"
import Service from "pages/Service"

import 'css/App.css'

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
          <section className="coa-page_content">
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
