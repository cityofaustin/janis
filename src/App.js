import React, { Component, Fragment, Suspense, useEffect } from 'react';
import { Root, useSiteData } from 'react-static';
import { Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { useIntl } from 'react-intl';
import { LANG_URL_REGEX } from 'js/i18n/constants';
import { Helmet } from 'react-helmet'; // Helmet allows us to inject html attributes in the the document Header, body, and html tags.
import CMSPreview from 'components/_Controllers/CMSPreview';
import CMSLive from 'components/_Controllers/CMSLive';
import I18nController from 'components/I18n/I18nController';
import SkipToMain from 'components/PageSections/SkipToMain';
import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';
import Alert from 'components/Alerts';
import { alert as i18n1 } from 'js/i18n/definitions';

const LANG_KEY = {
  en: 'en-US',
  es: 'es-001',
};

import 'css/coa.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppView = ({ path }) => {
  const intl = useIntl();
  const { navigation } = useSiteData();

  return (
    <div>
      <SkipToMain />
      {/* START ⚠️COVID_19 Hardcoded */}
      <Alert
        badge="Coronavirus (COVID-19)"
        link="https://www.austintexas.gov/COVID19"
        description={intl.formatMessage(i18n1.getLatest)}
      />
      {/* END ⚠️COVID_19 Hardcoded */}
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

/**
  The QueryParamProvider is required in order to use the useQueryParam hook.
**/
const App = ({ navigation, threeoneone }) => {
  return (
    <Root>
      <QueryParamProvider ReactRouterRoute={Route}>
        <div>
          <Route
            path={`${LANG_URL_REGEX}:path*`}
            render={props => (
              <I18nController
                lang={props.match.params.lang}
                path={props.match.params.path}
              >
                <Helmet
                  htmlAttributes={{
                    lang: LANG_KEY[props.match.params.lang || 'en'],
                  }}
                />
                <Suspense fallback={<div>LOADING</div>}>
                  <AppView path={props.match.params.path || ''} />
                </Suspense>
              </I18nController>
            )}
          />
        </div>
      </QueryParamProvider>
    </Root>
  );
};

export default App;
