import React, { Component } from 'react';
import { Router, Route } from 'react-static';
import ReactGA from 'react-ga';
import { logPageView } from 'js/helpers/googleAnalytics';
import I18nController from 'components/I18n/I18nController';

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
          {/* regex to split url location into 2 character lang code (if present) and page path
            Add with SiteData to App export
            Route
            render = {props => {
              <I18nController>
                <SkipToMain />
                <LanguageSelectBar path={match.params.path || ''} />
                <Header navigation={navigation[lang]} /> <-- with site data and injectIntl to get locale
                <main role="main" id="main">
                  <Routes />
                </main>
                <Footer threeoneone={threeoneone[lang]} /> <-- with site data and injectIntl to get locale
              </I18nController>
            }}

          */}
          <Route
            path="(/)?:lang([a-z]{2})?/:path*"
            component={I18nController}
          />
        </div>
      </Router>
    );
  }
}

export default App;
