import React, { Component, Fragment, Suspense } from 'react';
import { Root, Routes, useSiteData } from 'react-static';
import { Route, Switch } from 'react-router';
import { injectIntl } from 'react-intl';
import { LANG_URL_REGEX } from 'js/i18n/constants';
import CMSPreview from 'components/_Controllers/CMSPreview';
import CMSLive from 'components/_Controllers/CMSLive';
import I18nController from 'components/I18n/I18nController';
import SkipToMain from 'components/PageSections/SkipToMain';
import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';

import 'css/coa.css';

const AppView = injectIntl(({ intl }) => {
  const { path, navigation } = useSiteData();

  return (
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
      <Footer />
    </div>
  );
});

const App = ({ navigation, threeoneone }) => {
  return (
    <Root>
      <div>
        <Route
          path={`${LANG_URL_REGEX}:path*`}
          render={props => (
            <I18nController
              lang={props.match.params.lang}
              path={props.match.params.path}
            >
              <Suspense fallback={<div>LOAD</div>}>
                <AppView path={props.match.params.path || ''} />
              </Suspense>
            </I18nController>
          )}
        />
      </div>
    </Root>
  );
};

export default App;
