import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Banner from "components/Banner"
import Header from "components/Header"
import ServicesIndex from "components/ServicesIndex"
import Service from "components/Service"

import 'css/App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Banner />
          <Header />
          <section className="usa-section usa-grid">
            <Route path="/services" component={ServicesIndex} />
            <Route path="/service/:id" component={Service} />
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
