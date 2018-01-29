import React, { Component } from 'react';
import { get } from 'lodash';
import { parse } from 'query-string';
import { Link, getRouteProps } from 'react-static';

import { cleanContacts, cleanRelatedServiceLinks } from 'js/helpers/cleanData';

import ContentItems from 'js/page_sections/ContentItems';
import Contact from 'js/page_sections/Contact';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import FormFeedback from 'js/page_sections/FormFeedback';
import Service311 from 'js/page_sections/Service311';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';
import Hero from 'js/modules/Hero';

import jsonFileData from '__tmpdata/services';

class Service extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps, nextState) {
    // only refetch data when props have changed
    // this happens only when the route is updated
    const isSlugChanged = nextProps.match.params.slug !== this.props.match.params.slug
    const isLanguageChanged = nextProps.lang !== this.props.lang;

    if (isSlugChanged || isLanguageChanged) {
      this.fetchData(nextProps.match.params.slug, nextProps.lang);
    }
  }

  // TODO: this will be broken in JOPLIN
  fetchData(slug, lang = this.props.lang) {
    console.log('fetching data', ` for ${slug}`, ` in ${lang}`)

    if (process.env.NODE_ENV !== 'production') {
      // Allow querystrings to set data, which is used in joplin for livepreview
      const query = parse(this.props.location.search);
      if (query.preview) {
        const data = JSON.parse(query.d);
        this.setState({ data: data });
        return;
      }
    }
  }

  render() {
    const { servicePage } = this.props;
    const topicId = get(servicePage, "topic.id", null);
    const topicName = get(servicePage, "topic.text", null);
    const title = get(servicePage, "title", null);
    const steps = get(servicePage, "content", null);
    const contentItems = get(servicePage, "extraContent", null);
    const services311 = get(jsonFileData, "services311", null);
    const image = servicePage.image;
    const contacts = cleanContacts(servicePage.contacts);
    const relatedlinks = cleanRelatedServiceLinks(servicePage.related);

    return (
      <div> 
        <Hero image={image} />

        <div className="wrapper">
          <div className="row">
            <div className="coa-main__left col-xs-12 col-lg-8">

              <div className="coa-section">
                { topicId && (
                  <Link className="coa-main__breadcrumb"
                    to={`/topic/${topicId}`}>
                    {topicName}
                  </Link>
                )}
                <h2 className="coa-main__title">{title}</h2>
                { steps && (
                  <div className="coa-main__steps">
                    <HtmlFromAdmin content={steps} />
                  </div>
                )}
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


export default getRouteProps(Service);
