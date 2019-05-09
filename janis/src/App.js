import React, { Component, Fragment } from 'react';
import { Root, Routes, Switch, withSiteData } from 'react-static';
import { Link, Router } from 'components/Router';
import { injectIntl } from 'react-intl';
import { LANG_URL_REGEX } from 'js/i18n/constants';
import CMSPreview from 'components/_Controllers/CMSPreview';
import CMSLive from 'components/_Controllers/CMSLive';
import I18nController from 'components/I18n/I18nController';
import SkipToMain from 'components/PageSections/SkipToMain';
import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';

import 'css/coa.css';

// const AppView = withSiteData(
//   injectIntl(({ path, navigation, threeoneone, intl }) => (
//     <div>
//       <SkipToMain />
//       <Header navigation={navigation[intl.locale]} path={path} />
//       <main role="main" id="main">
//         <Switch>
//           <Route
//             path={`${LANG_URL_REGEX}preview/:page_type/:revision_id`}
//             component={CMSPreview}
//           />
//           <Route component={CMSLive} />
//         </Switch>
//       </main>
//       <Footer threeoneone={threeoneone[intl.locale]} />
//     </div>
//   )),
// );

const App = () => (
  <Root>
    <div>
      <React.Suspense fallback={<em>Loading...</em>}>
        <Header />
        <Router>
          <Routes default />
        </Router>
      </React.Suspense>
      <Footer />
    </div>
  </Root>
);

export default App;
