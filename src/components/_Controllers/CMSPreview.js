import React, { Component } from 'react';
import { Route, Switch } from 'react-static';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { request } from 'graphql-request';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import getServicePageRevisionQuery from 'js/queries/getServicePageRevisionQuery';
import getProcessPageRevisionQuery from 'js/queries/getProcessPageRevisionQuery';
import { cleanProcesses, cleanServices } from 'js/helpers/cleanData';
import Service from 'components/Pages/Service';
import Process from 'components/Pages/Process';

class CMSPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const {
      intl,
      match: {
        params: { revision_id, page_type },
      },
    } = this.props;

    const client = createGraphQLClientsByLang(intl.locale);
    //TODO: one endpoint for revisions data requests
    let req;
    switch (page_type) {
      case 'services':
        req = client.request(getServicePageRevisionQuery, { id: revision_id });
        break;
      case 'processes':
        req = client.request(getProcessPageRevisionQuery, { id: revision_id });
        break;
    }
    req.then(data => {
      switch (page_type) {
        case 'services':
          this.setState({
            data: {
              edges: [
                {
                  node: data.pageRevision.asServicePage,
                },
              ],
            },
          });
          break;
        case 'processes':
          this.setState({
            data: {
              edges: [
                {
                  node: data.pageRevision.asProcessPage,
                },
              ],
            },
          });
          break;
      }
    });
  }

  render() {
    const {
      match: {
        params: { revision_id, page_type },
      },
    } = this.props;
    const { data } = this.state;
    if (!this.state.data) return <h1>⏱️LoAdInG⏱️...</h1>;
    return (
      <Switch location={{ pathname: `/${page_type}` }}>
        <Route
          path="/processes"
          render={props => <Process process={cleanProcesses(data)[0]} />}
        />
        <Route
          path="/services"
          render={props => <Service service={cleanServices(data)[0]} />}
        />
      </Switch>
    );
  }
}

CMSPreview.propTypes = {};

export default injectIntl(CMSPreview);
