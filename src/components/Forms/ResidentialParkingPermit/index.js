import React, { Component } from 'react';
import PageHeader from 'components/PageHeader';

// US FORMS DEPENDCIES
import { IndexRedirect, Route, Router, withRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';

import 'us-forms-system/lib/css/styles.css';

// US FORMS FILES
import { makeRoutes } from './routes.jsx';
import reducer from './reducers';
import Form from './Form.jsx';
import Introduction from './Introduction.jsx';

const store = createStore(combineReducers(reducer));
const browserHistory = createHistory({
  basename: '',
});

class ResidentialParkingPermit extends Component {
  render() {
    return (
      <div className="wrapper container-fluid FosterPetForm">
        <div className="row">
          <PageHeader>Austin Animal Center Foster Care Application</PageHeader>

          <div className="col-md-12">
            <Provider store={store}>
              <Router history={browserHistory}>
                <Route path="/" component={Introduction} />
              </Router>
            </Provider>
          </div>
        </div>
      </div>
    );
  }
}

export default ResidentialParkingPermit;
