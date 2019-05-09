import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, withSiteData } from 'react-static';
import { injectIntl } from 'react-intl';
import { LANG_URL_REGEX } from 'js/i18n/constants';
import CMSPreview from 'components/_Controllers/CMSPreview';
import CMSLive from 'components/_Controllers/CMSLive';
import I18nController from 'components/I18n/I18nController';
import SkipToMain from 'components/PageSections/SkipToMain';
import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';

import 'css/coa.scss';

const AppView = withSiteData(
  injectIntl(({ path, navigation, threeoneone, intl }) => (
    <div>
      <SkipToMain />
      <Header navigation={navigation[intl.locale]} path={path} />
      <main role="main" id="main">
        <Switch>
          <Route
            path={`${LANG_URL_REGEX}preview/:page_type/:revision_id`}
            component={CMSPreview}
          />
          <Route component={CMSLive} />
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
        path={`${LANG_URL_REGEX}:path*`}
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
