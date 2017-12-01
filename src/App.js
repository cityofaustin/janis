import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Banner from "components/Banner"
import Header from "components/Header"
import ServicesIndex from "pages/Services"
import Service from "pages/Service"

import 'css/App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Banner />
          <Header />
          <section>
            <Route path="/services" component={ServicesIndex} />
            <Route path="/service/:id" component={Service} />
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
