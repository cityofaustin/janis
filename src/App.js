import React, { Component, Fragment } from 'react';
import { Router, Route, withSiteData } from 'react-static';
import Routes from 'react-static-routes';
import { injectIntl } from 'react-intl';
import ReactGA from 'react-ga';
import { logPageView } from 'js/helpers/googleAnalytics';
import I18nController from 'components/I18n/I18nController';
import EditController from 'components/Edit/EditController';
import SkipToMain from 'components/PageSections/SkipToMain';
import Header from 'components/PageSections/Header';
import Footer from 'components/PageSections/Footer';
import 'css/coa.css';

import EditModal from 'components/Edit/EditModal';

ReactGA.initialize(process.env.GOOGLE_ANALYTICS, { titleCase: false });

export const AppContext = React.createContext();

const AppView = withSiteData(
  injectIntl(
    ({
      path,
      navigation,
      threeoneone,
      intl,
      toggleEditModal,
      isModalOpen,
      showEditModal,
      hideEditModal,
      grabItemContent,
      itemContent,
    }) => (
      <div onClick={grabItemContent}>
        <SkipToMain />
        <Header navigation={navigation[intl.locale]} path={path} />
        <main role="main" id="main">
          <Routes />
          {isModalOpen && (
            <EditModal
              itemContent={itemContent}
              showEditModal={showEditModal}
              hideEditModal={hideEditModal}
            />
          )}
        </main>
        <Footer threeoneone={threeoneone[intl.locale]} />
      </div>
    ),
  ),
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInEditMode: false,
      isModalOpen: false,
      itemContent: '',
    };
  }
  toggleEditingMode = e => {
    this.setState({ isInEditMode: !this.state.isInEditMode });
  };

  showEditModal = () => {
    this.setState({ isModalOpen: true });
  };

  hideEditModal = () => {
    this.setState({ isModalOpen: false });
  };

  grabItemContent = e => {
    const itemToEdit = e.target;

    if (
      this.state.isInEditMode &&
      itemToEdit.classList.contains('coa-isEditable')
    ) {
      console.log('grabbing item content', e.target);
      this.showEditModal();
      e.preventDefault();
      this.setState({
        itemContent: itemToEdit.innerText,
      });
    }
  };

  render() {
    console.log(this.state.itemContent, 'item content');

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
                <EditController
                  isInEditMode={this.state.isInEditMode}
                  toggleEditingMode={this.toggleEditingMode}
                >
                  <AppContext.Provider
                    value={{ isInEditMode: this.state.isInEditMode }}
                  >
                    <AppView
                      itemContent={this.state.itemContent}
                      grabItemContent={this.grabItemContent}
                      path={props.match.params.path || ''}
                      isModalOpen={this.state.isModalOpen}
                      showEditModal={this.showEditModal}
                      hideEditModal={this.hideEditModal}
                    />
                  </AppContext.Provider>
                </EditController>
              </I18nController>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
