import React, { Component } from 'react';
import { Route, Switch } from 'react-static';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { request } from 'graphql-request';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import getRevision from 'js/helpers/getRevisionData';
import allProcessesQuery from 'js/queries/allProcessesQuery';
import { cleanProcesses, cleanServices } from 'js/helpers/cleanData';
import Services from 'components/Pages/Services';
import Service from 'components/Pages/Service';
import Processes from 'components/Pages/Processes';

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
    debugger;
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
      case 'service':
        getRevision(client, revision_id, intl.locale).then(data => {
          this.setState({ data: data });
        });
        return;
      case 'services':
        req = client.request(allServicePagesQuery);
        break;
      case 'processes':
        req = client.request(allProcessesQuery);
        break;
    }
    req.then(data => {
      this.setState({ data: data });
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
          path="/services"
          render={props => <Services services={cleanServices(data)} />}
        />
        <Route
          path="/processes"
          render={props => <Processes processes={cleanProcesses(data)} />}
        />
        <Route path="/service" render={props => <Service service={data} />} />
      </Switch>
    );
  }
}

CMSPreview.propTypes = {};

export default injectIntl(CMSPreview);
