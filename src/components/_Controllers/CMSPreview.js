import React, { Component } from 'react';
import { Route, Switch } from 'react-static';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { request } from 'graphql-request';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import getServicePageRevisionQuery from 'js/queries/getServicePageRevisionQuery';
import getProcessPageRevisionQuery from 'js/queries/getProcessPageRevisionQuery';
import getInformationPageRevisionQuery from 'js/queries/getInformationPageRevisionQuery';
import getTopicPageRevisionQuery from 'js/queries/getTopicPageRevisionQuery';
import getDepartmentPageRevisionQuery from 'js/queries/getDepartmentPageRevisionQuery';
import getTopicCollectionPageRevisionQuery from 'js/queries/getTopicCollectionPageRevisionQuery';
import {
  cleanProcesses,
  cleanServicesForPreview,
  cleanInformationForPreview,
  cleanTopics,
  cleanDepartments,
  cleanTopicCollections,
} from 'js/helpers/cleanData';
import Service from 'components/Pages/Service';
import Process from 'components/Pages/Process';
import InformationPage from 'components/Pages/Information';
import Topic from 'components/Pages/Topic';
import Department from 'components/Pages/Department';
import TopicCollection from 'components/Pages/TopicCollection';

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
      case 'information':
        req = client.request(getInformationPageRevisionQuery, {
          id: revision_id,
        });
        break;
      case 'topic':
        req = client.request(getTopicPageRevisionQuery, {
          id: revision_id,
        });
        break;
      case 'department':
        req = client.request(getDepartmentPageRevisionQuery, {
          id: revision_id,
        });
        break;
      case 'topiccollection':
        req = client.request(getTopicCollectionPageRevisionQuery, {
          id: revision_id,
        });
        break;
    }
    req.then(data => {
      let page;

      switch (page_type) {
        case 'services':
          page = data.pageRevision.asServicePage;
          break;
        case 'processes':
          page = data.pageRevision.asProcessPage;
          break;
        case 'information':
          page = data.pageRevision.asInformationPage;
          break;
        case 'topic':
          page = data.pageRevision.asTopicPage;
          break;
        case 'department':
          page = data.pageRevision.asDepartmentPage;
          break;
        case 'topiccollection':
          page = data.pageRevision.asTopicCollectionPage;
          break;
      }

      this.setState({
        data: {
          edges: [
            {
              node: page,
            },
          ],
        },
      });
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
          render={props => <Service service={cleanServicesForPreview(data)} />}
        />
        <Route
          path="/information"
          render={props => (
            <InformationPage
              informationPage={cleanInformationForPreview(data)}
            />
          )}
        />
        <Route
          path="/topic"
          render={props => {
            let topic = cleanTopics(data)[0];
            topic.topLinks = [
              { text: 'Top link', url: '' },
              { text: 'Other top link', url: '' },
            ];
            topic.otherLinks = [
              { text: 'First link', url: '' },
              { text: 'Second link', url: '' },
              { text: 'Third link', url: '' },
              { text: 'Fourth link', url: '' },
            ];
            topic.topiccollection = { topics: [], theme: {} };

            return <Topic topic={topic} />;
          }}
        />
        <Route
          path="/topiccollection"
          render={props => {
            let tc = cleanTopicCollections(data)[0];
            tc.topics = [{ title: 'Sample Text' }];

            return <TopicCollection tc={tc} />;
          }}
        />
        <Route
          path="/department"
          render={props => (
            <Department department={cleanDepartments(data)[0]} />
          )}
        />
      </Switch>
    );
  }
}

CMSPreview.propTypes = {};

export default injectIntl(CMSPreview);
