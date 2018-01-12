import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LanguageWrapper from "js/components/LanguageWrapper"

import 'css/coa.css'

class App extends Component {
  render() {
    return (
        <Router>
          <Route path={`/:lang?`}
            render={(props) => {
              return (
                <LanguageWrapper {...props}
                  urlPathLanguage={props.match.params.lang}
                />
              )
            }}
          />
        </Router>
    );
  }
}

export default App;
