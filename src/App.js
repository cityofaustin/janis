import React, { Component } from 'react'
import { Router, Route } from 'react-static'
import ReactGA from 'react-ga'
import { logPageView } from 'js/helpers/googleAnalytics'
import LanguageWrapper from "js/components/LanguageWrapper"

import 'css/coa.css'

ReactGA.initialize('UA-110716917-2', {titleCase: false});

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path={`/:lang?`}
            render={(props) => {
              logPageView();
              return (
                <LanguageWrapper {...props}
                  urlPathLanguage={props.match.params.lang}
                />
              )
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
