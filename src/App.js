import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// components
import Banner from "js/page_sections/Banner"
import I18nBanner from "js/page_sections/I18nBanner"
import Header from "js/page_sections/Header"
import Footer from "js/page_sections/Footer"

// page routes
import Home from "js/pages/Home"
import Search from "js/pages/Search"
import Services from "js/pages/Services"
import Service from "js/pages/Service"
import Department from "js/pages/Department"
import Topic from "js/pages/Topic"

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
            <Route path="/service/:slug" component={Service} />
            <Route path="/department/:id" component={Department} />
            <Route path="/topic/:id" component={Topic} />
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
