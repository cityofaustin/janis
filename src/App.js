import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import locale from 'browser-locale'

import LanguageWrapper from "components/layout/LanguageWrapper"

import 'css/coa.css'

class App extends Component {
  render() {
    return (
        <Router>
          <Route path={`/:lang?`}
            render={(props) => {
              return <LanguageWrapper urlPathLanguage={props.match.params.lang} />
            }}
          />
        </Router>
    );
  }
}

export default App;
