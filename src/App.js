import React, { Component, Fragment, Suspense, useEffect } from 'react';
import { Root, useSiteData } from 'react-static';
import { Route, Switch } from 'react-router';
import { useLocation } from "react-router-dom";
import { useIntl } from 'react-intl';
import { LANG_URL_REGEX } from 'js/i18n/constants';
import { Helmet } from "react-helmet"; // Helmet allows us to inject html attributes in the the document Header, body, and html tags.
import CMSPreview from 'components/_Controllers/CMSPreview';
import CMSLive from 'components/_Controllers/CMSLive';
import I18nController from 'components/I18n/I18nController';
import SkipToMain from 'components/PageSections/SkipToMain';
import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';

const LANG_KEY = {
  'en': 'en-US',
  'es': 'es-001'
}

import 'css/coa.css';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const AppView = ({path}) => {
  const intl = useIntl();
  const { navigation } = useSiteData();

  return (
    <div>
      <SkipToMain />
      <Header navigation={navigation[intl.locale]} path={path} />
      <main role="main" id="main">
        <ScrollToTop />
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
};

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
              <Helmet
                htmlAttributes={{ lang : LANG_KEY[props.match.params.lang || "en"] }}
              />
              <Suspense fallback={<div>LOADING</div>}>
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
