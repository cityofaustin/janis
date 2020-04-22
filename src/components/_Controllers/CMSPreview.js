import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { request } from 'graphql-request';
import queryString from 'query-string';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import {
  getPageRevisionQuery,
  getAsPage,
} from 'js/queries/getPageRevisionQuery';

import Service from 'components/Pages/Service';
import InformationPage from 'components/Pages/Information';
import Topic from 'components/Pages/Topic';
import Department from 'components/Pages/Department';
import TopicCollection from 'components/Pages/TopicCollection';
import OfficialDocumentList from 'components/Pages/OfficialDocuments/OfficialDocumentList';
import FormContainer from 'components/Pages/Form';
import Guide from 'components/Pages/Guide';
import LocationPage from 'components/Pages/Location';
import EventPage from 'components/Pages/Event';

import {
  cleanInformationForPreview,
  cleanTopicsForPreview,
  cleanDepartmentForPreview,
  cleanLocationPage,
  // chia do we need this
  getOfferedByFromDepartments,
} from 'js/helpers/cleanData';

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
    const { CMS_API } = queryString.parse(this.props.location.search);

    const client = createGraphQLClientsByLang(intl.locale, CMS_API);
    let req;
    req = client.request(getPageRevisionQuery[page_type], { id: revision_id });

    req.then(data => {
      console.log(page_type)
      const page = data.pageRevision[getAsPage[page_type]];
      const janis_instance = data.pageRevision.previewJanisInstance;

      console.log('P', page)

      page.contextualNavData = {
        relatedTo: [],
        offeredBy: [
          {
            title: !!page.department && page.departments[0].title,
            url: !!page.department && `\${page.departments[0].slug}`,
          },
        ],
        parent: !!janis_instance.parent
          ? janis_instance.parent
          : {
              url: 'no-topics',
              title: 'No topics selected',
              topiccollection: {
                topics: [],
              },
            },
      };

      this.setState({
        page: page,
      });
    });
  }

  render() {
    const {
      match: {
        params: { revision_id, page_type },
      },
    } = this.props;
    const { page } = this.state;
    console.log(page_type)

    if (!page) return <h1>Loading</h1>;
    return (
      <Switch location={{ pathname: `/${page_type}` }}>
        <Route path="/services" render={props => <Service service={page} />} />
        <Route
          path="/official_document"
          render={props => <OfficialDocumentList officialDocumentPage={page} />}
        />
        <Route
          path="/information"
          render={props => (
            <InformationPage
              informationPage={cleanInformationForPreview(page)}
            />
          )}
        />
        <Route
          path="/topic"
          render={props => {
            let topic = cleanTopicsForPreview(page);
            if (!topic.topLinks) {
              topic.topLinks = [
                { title: 'Top link', url: '' },
                { title: 'Other top link', url: '' },
              ];
            }
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
            //come back to this.
            let tc = page;
            tc.topics = [
              {
                title: 'Sample Text',
                topiccollection: {
                  theme: {
                    slug: 'sample',
                  },
                  slug: 'sample',
                },
              },
            ];
            return <TopicCollection tc={tc} />;
          }}
        />
        <Route
          path="/department"
          render={props => (
            <Department department={cleanDepartmentForPreview(page)} />
          )}
        />
        <Route
          path="/form"
          render={props => (
            <FormContainer
              formContainer={page}
            />
          )}
        />
        <Route
          path="/guide"
          render={props => <Guide guidePage={page} />}
        />
        <Route
          path="/location"
          render={props => (
            <LocationPage
              locationPage={cleanLocationPage(page).locationPage}
            />
          )}
        />
        <Route
          path="/event"
          render={props => {
            let eventPage = page;
            eventPage.offeredBy = getOfferedByFromDepartments(
              eventPage.departments,
            );

            return <EventPage eventPage={eventPage} />;
          }}
        />
      </Switch>
    );
  }
}

CMSPreview.propTypes = {};

export default injectIntl(CMSPreview);
