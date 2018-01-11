import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import { parse } from 'query-string';

import ContentItems from 'js/page_sections/ContentItems';
import Contact from 'js/page_sections/Contact';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import FormFeedback from 'js/page_sections/FormFeedback';
import Service311 from 'js/page_sections/Service311';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';
import servicePageQuery from 'js/queries/servicePageQuery';

import jsonFileData from '__tmpdata/services';

class Service extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };

  }

  componentDidMount() {
    this.fetchData(this.props.match.params.slug);
  }

  componentWillReceiveProps(nextProps) {
    // only refetch data when props have changed
    // this happens only when the route is updated

    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.fetchData(nextProps.match.params.slug);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // only rerender component when state has changed
    // this happens only when data is refetched

    if (nextState.data.id !== this.state.data.id) return true;

    return false;
  }

  fetchData(slug) {

    if (process.env.NODE_ENV !== 'production') {
      // Allow querystrings to set data, which is used in joplin for livepreview
      const query = parse(this.props.location.search);
      if (query.preview) {
        const data = JSON.parse(query.d);
        this.setState({ data: data });
        return;
      }
    }

    axios
      .post(`${process.env.REACT_APP_CMS_ENDPOINT}/graphql/`, {
        query: servicePageQuery,
        variables: {
          slug: slug,
        }
      })
      .then(res => {
        this.setState({ data: res.data.data.servicePage });
      })
      .catch(err => console.log(err))
  }

  cleanRelatedLinks(relatedlinks) {
    if (!relatedlinks) return null;

    return (
      relatedlinks.map((link) => {
        return {
          url: `/service/${link.slug}`,
          text:  link.title
        }
      })
    )
  }

  render() {

    const { data } = this.state;

    const topicId = get(data, "topic.id", null);
    const topicName = get(data, "topic.text", null);
    const title = get(data, "title", null);
    const steps = get(data, "content", null);
    const contentItems = get(data, "extraContent", null);
    const contacts = get(data, "contacts.edges", null);
    const relatedlinks = this.cleanRelatedLinks(get(data, "related", null));
    const services311 = get(jsonFileData, "services311", null);

    return (

      <div>

        <div className="wrapper">
          <div className="coa-main__hero coa-main__hero--small"></div>
        </div>

        <div className="wrapper">
          <div className="row">
            <div className="coa-main__left col-xs-12 col-lg-8">

              <div className="coa-section">
                { topicId && ( <a className="coa-main__breadcrumb" href={`/services/topic/${topicId}`}>{topicName}</a> )}
                <h2 className="coa-main__title">{title}</h2>
                { steps && ( <div className="coa-main__steps"><HtmlFromAdmin content={steps} /></div> )}
              </div>

              <ContentItems contentItems={contentItems} />

            </div>

            <div className="coa-main__right col-xs-12 col-lg-4">

              <Contact contacts={contacts} />

            </div>
          </div>
        </div>

        <RelatedLinks
          relatedlinks={relatedlinks}
          sectionLink={{url: `/topic/${topicId}`, text: `See all services under ${topicName}`}}
          sectionStyle="primary"
          sectionTitle="Check out related city services"
          sectionText={null}
        />

        <div className="coa-section coa-section--lightgrey">
          <div className="wrapper">
            <FormFeedback />
            <a className="coa-section__link" href="#">Return to Top</a>
          </div>
        </div>

        <Service311 services311={services311} />

      </div>
    );
  }

}

export default Service;
