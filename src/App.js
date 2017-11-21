import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import ServicesIndex from "./ServicesIndex"
import Service from "./Service"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header className="App-header">
            <p className="App-intro">
              Hello Janis <span role="img" aria-label="peace sign">☮️</span>
            </p>
          </header>
          <Route path="/services" component={ServicesIndex} />
          <Route path="/service/:id" component={Service} />
        </div>
      </Router>
    );
  }
}

export default App;
