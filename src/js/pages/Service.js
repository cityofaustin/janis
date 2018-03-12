import React from 'react';
import { get } from 'lodash';
import { parse } from 'query-string';
import { withRouteData } from 'react-static';

import { cleanContacts, cleanRelatedServiceLinks } from 'js/helpers/cleanData';

import ContentItems from 'js/page_sections/ContentItems';
import Contact from 'js/page_sections/Contact';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import FormFeedback from 'js/page_sections/FormFeedback';
import Service311 from 'js/page_sections/Service311';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';
import Hero from 'js/modules/Hero';
import I18nLink from 'js/modules/I18nLink';

import jsonFileData from '__tmpdata/services';

const Service = ({ service }) => {
  const topicId = get(service, "topic.id", null);
  const topicName = get(service, "topic.text", null);
  const title = get(service, "title", null);
  const steps = get(service, "content", null);
  const contentItems = get(service, "extraContent", null);
  const services311 = get(jsonFileData, "services311", null);
  const image = service.image;
  const contacts = cleanContacts(service.contacts);
  const relatedLinks = cleanRelatedServiceLinks(service.related);

  return (
    <div>

      <Hero image={image} />

      <div className="wrapper">
        <div className="row">
          <div className="coa-main__left col-xs-12 col-lg-8">

            <div className="coa-section">
              { topicId && (
                <I18nLink className="coa-main__breadcrumb"
                  to={`/topics/${topicId}`}>
                  {topicName}
                </I18nLink>
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
        relatedLinks={relatedLinks}
        sectionLink={{url: `/topics/${topicId}`, text: `See all services under ${topicName}`}}
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
  )
}

export default withRouteData(Service);
