import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, withSiteData } from 'react-static';
import Routes from 'react-static-routes';
import { injectIntl } from 'react-intl';
import ReactGA from 'react-ga';
import { logPageView } from 'js/helpers/googleAnalytics';
import CMSPreview from 'components/CMSPreview';
import I18nController from 'components/I18n/I18nController';
import SkipToMain from 'components/PageSections/SkipToMain';
import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';

import 'css/coa.css';

const pathLangRegex = '(/)?:lang([a-z]{2})?/';

//TODO: make CMSLive controller for static routes
//add GA to this controller
ReactGA.initialize(process.env.GOOGLE_ANALYTICS, { titleCase: false });

const AppView = withSiteData(
  injectIntl(({ path, navigation, threeoneone, intl }) => (
    <div>
      <SkipToMain />
      <Header navigation={navigation[intl.locale]} path={path} />
      <main role="main" id="main">
        <Switch>
          <Route
            path={`${pathLangRegex}preview/:page_type/:revision_id`}
            component={CMSPreview}
          />
          <Routes />
        </Switch>
      </main>
      <Footer threeoneone={threeoneone[intl.locale]} />
    </div>
  )),
);

const App = ({ navigation, threeoneone }) => (
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
        path={`${pathLangRegex}:path*`}
        render={props => (
          <I18nController
            lang={props.match.params.lang}
            path={props.match.params.path}
          >
            <AppView path={props.match.params.path || ''} />
          </I18nController>
        )}
      />
    </div>
  </Router>
);

export default App;
