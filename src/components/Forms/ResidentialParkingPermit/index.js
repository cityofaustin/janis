import React, { Component } from 'react';
import PageHeader from 'components/PageHeader';

// US FORMS DEPENDCIES
import {
  IndexRedirect,
  Route,
  Router,
  useRouterHistory,
  withRouter,
} from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';

import 'us-forms-system/lib/css/styles.css';

// US FORMS FILES
import { makeRoutes } from './routes.jsx';
import reducer from './reducers';
import Form from './Form.jsx';

const store = createStore(combineReducers(reducer));

const browserHistory = useRouterHistory(createHistory)({
  basename: '',
});

// NOTE: This version of the created history might be better to use is we don't
// want to worry about the useRouterHistory HOC
//
// const browserHistory = createHistory({
//   basename: '',
// });

class ResidentialParkingPermit extends Component {
  render() {
    return (
      <div className="wrapper container-fluid FosterPetForm">
        <div className="row">
          <PageHeader>Austin Animal Center Foster Care Application</PageHeader>

          <div className="col-md-12">
            <Provider store={store}>
              <Router history={browserHistory}>
                {/* {makeRoutes(withRouter)} */}
              </Router>
            </Provider>
          </div>
        </div>
      </div>
    );
  }
}

export default ResidentialParkingPermit;
