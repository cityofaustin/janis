import React, { Component } from 'react';
import { Router, Route, withSiteData } from 'react-static';
import Routes from 'react-static-routes';
import ReactGA from 'react-ga';
import { logPageView } from 'js/helpers/googleAnalytics';
import I18nController from 'components/I18n/I18nController';
import SkipToMain from 'components/PageSections/SkipToMain';
import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';
import 'css/coa.css';

ReactGA.initialize(process.env.GOOGLE_ANALYTICS, { titleCase: false });

class App extends Component {
  render() {
    const { navigation, threeoneone } = this.props;
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
            render={props => (
              <I18nController
                lang={props.match.params.lang}
                path={props.match.params.path}
              >
                <SkipToMain />
                <Header
                  navigation={navigation}
                  path={props.match.params.path || ''}
                />
                <main role="main" id="main">
                  <Routes />
                </main>
                <Footer threeoneone={threeoneone} />
              </I18nController>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default withSiteData(App);
