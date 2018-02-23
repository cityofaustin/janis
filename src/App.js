import React, { Component } from 'react'
import { Router, Route } from 'react-static'
import ReactGA from 'react-ga'
import GoogleAnalyticsPageView from 'js/helpers/GoogleAnalyticsPageView'
import LanguageWrapper from 'js/components/LanguageWrapper'

import 'css/coa.css'

ReactGA.initialize('UA-110716917-2', { debug: true });

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={GoogleAnalyticsPageView} />
          <Route path="(/)?:lang([a-z]{2})?/:path*" component={LanguageWrapper} />
        </div>
      </Router>
    );
  }
}

export default App;
