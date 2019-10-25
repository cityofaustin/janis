import React, { Component } from 'react';
import { Route, Switch } from 'react-static';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { request } from 'graphql-request';
import queryString from 'query-string';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import getServicePageRevisionQuery from 'js/queries/getServicePageRevisionQuery';
import getInformationPageRevisionQuery from 'js/queries/getInformationPageRevisionQuery';
import getTopicPageRevisionQuery from 'js/queries/getTopicPageRevisionQuery';
import getDepartmentPageRevisionQuery from 'js/queries/getDepartmentPageRevisionQuery';
import getTopicCollectionPageRevisionQuery from 'js/queries/getTopicCollectionPageRevisionQuery';
import getOfficialDocumentPageRevisionQuery from 'js/queries/getOfficialDocumentPageRevisionQuery';
import getFormPageRevisionQuery from 'js/queries/getFormPageRevisionQuery';
import {
  cleanServicesForPreview,
  cleanInformationForPreview,
  cleanTopicsForPreview,
  cleanDepartments,
  cleanTopicCollections,
  cleanOfficialDocumentPagesForPreview,
  cleanFormPagesForPreview,
} from 'js/helpers/cleanData';
import Service from 'components/Pages/Service';
import InformationPage from 'components/Pages/Information';
import Topic from 'components/Pages/Topic';
import Department from 'components/Pages/Department';
import TopicCollection from 'components/Pages/TopicCollection';
import OfficialDocumentList from 'components/Pages/OfficialDocumentList';
import FormPage from 'components/Pages/Form';

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

    // Optional CMS_API param to build previews against non-default Joplin (ex: ?CMS_API=http://localhost:3000)
    const { CMS_API } = queryString.parse(this.props.location.search)

    const client = createGraphQLClientsByLang(intl.locale, CMS_API);
    //TODO: one endpoint for revisions data requests
    let req;
    switch (page_type) {
      case 'services':
        req = client.request(getServicePageRevisionQuery, { id: revision_id });
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
      case 'official_document':
        req = client.request(getOfficialDocumentPageRevisionQuery, {
          id: revision_id,
        });
        break;
      case 'form':
        req = client.request(getFormPageRevisionQuery, {
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
        case 'official_document':
          page = data.pageRevision.asOfficialDocumentPage;
          break;
        case 'form':
          page = data.pageRevision.asFormPage;
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

    if (!this.state.data) return <h1>Loading</h1>;
    return (
      <Switch location={{ pathname: `/${page_type}` }}>
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
            let topic = cleanTopicsForPreview(data)[0];
            topic.topLinks = [
              { title: 'Top link', url: '' },
              { title: 'Other top link', url: '' },
            ];
            topic.otherLinks = [
              { title: 'First link', url: '' },
              { title: 'Second link', url: '' },
              { title: 'Third link', url: '' },
              { title: 'Fourth link', url: '' },
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
        <Route
          path="/official_document"
          render={props => (
            <OfficialDocumentList
              officialDocumentPage={
                cleanOfficialDocumentPagesForPreview(data)[0]
              }
            />
          )}
        />
        <Route
          path="/form"
          render={props => (
            <FormPage formPage={cleanFormPagesForPreview(data)} />
          )}
        />
      </Switch>
    );
  }
}

CMSPreview.propTypes = {};

export default injectIntl(CMSPreview);
