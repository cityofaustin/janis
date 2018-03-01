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
          {/* regex to split url location into 2 character lang code (if present) and page path */}
          <Route path="(/)?:lang([a-z]{2})?/:path*" component={LanguageWrapper} />
          }
        </div>
      </Router>
    );
  }
}

export default App;
