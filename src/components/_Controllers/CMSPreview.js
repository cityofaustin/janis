import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
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
import OfficialDocumentCollection from 'components/Pages/OfficialDocuments/OfficialDocumentCollection';
import FormContainer from 'components/Pages/Form';
import Guide from 'components/Pages/Guide';
import LocationPage from 'components/Pages/Location';
import EventPage from 'components/Pages/Event';
import NewsPage from 'components/Pages/News';

import {
  cleanInformationForPreview,
  cleanTopicsForPreview,
  cleanDepartmentForPreview,
  cleanLocationPage,
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

    // CMS_API param to build previews against non-default Joplin (ex: ?CMS_API=http://localhost:8000)
    const { CMS_API } = queryString.parse(this.props.location.search);

    const client = createGraphQLClientsByLang(intl.locale, CMS_API);
    let req;
    console.log(page_type, revision_id)
    req = client.request(getPageRevisionQuery[page_type], { id: revision_id });

    req.then(data => {
      console.log(data);
      const page = data.pageRevision[getAsPage[page_type]];
      const janis_instance = data.pageRevision.previewJanisInstance;
      console.log('page!!! ', page)

      page.contextualNavData = {
        relatedTo: [],
        offeredBy:
          !!page.departments && !!page.departments[0]
            ? [
                {
                  title: page.departments[0].title,
                  url: `\${page.departments[0].slug}`,
                },
              ]
            : [
                {
                  title: 'no department selected',
                  url: 'no-department',
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
        page: { ...page, ...janis_instance },
      });
    });
  }

  render() {
    console.log(this.props)
    const {
      match: {
        params: { revision_id, page_type },
      },
    } = this.props;
    const { page } = this.state;

    if (!page) return <h1>Loading</h1>;
    return (
      <Switch location={{ pathname: `/${page_type}` }}>
        <Route path="/services" render={props => <Service service={page} />} />
        <Route
          path="/official_document_collection"
          render={props => <OfficialDocumentCollection officialDocumentCollection={page} />}
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
          render={props => <FormContainer formContainer={page} />}
        />
        <Route path="/guide" render={props => <Guide guidePage={page} />} />
        <Route
          path="/location"
          render={props => (
            <LocationPage locationPage={cleanLocationPage(page).locationPage} />
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
        <Route path="/news" render={props => <NewsPage newsPage={page} />} />
      </Switch>
    );
  }
}

CMSPreview.propTypes = {};

export default injectIntl(CMSPreview);
