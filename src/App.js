import React, { Component } from 'react';
import { Router, Route } from 'react-static';
import ReactGA from 'react-ga';
import { logPageView } from 'js/helpers/googleAnalytics';
import LanguageWrapper from 'components/LanguageWrapper';

import 'css/coa.css';

ReactGA.initialize(process.env.GOOGLE_ANALYTICS, { titleCase: false });

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route
            path="*"
            render={props => {
              logPageView();
              return null;
            }}
          />
          {/* regex to split url location into 2 character lang code (if present) and page path */}
          <Route
            path="(/)?:lang([a-z]{2})?/:path*"
            component={LanguageWrapper}
          />
        </div>
      </Router>
    );
  }
}

export default App;
