import React from 'react';
import { withRouteData } from 'react-static';
import { get } from 'lodash';

import Hero from 'js/modules/Hero';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import FormFeedback from 'js/page_sections/FormFeedback';
import Service311 from 'js/page_sections/Service311';

import { cleanServiceLinks } from 'js/helpers/cleanData';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/services';
const title = get(jsonFileData, "servicespage.title", null);
const body = get(jsonFileData, "servicespage.body", null);
const services311 = get(jsonFileData, "services311", null);

const Services = ({ allServices }) => {
  const relatedLinks = cleanServiceLinks(allServices)

  return (
    <div>
      <div className="wrapper">
        <Hero callout={title} />
        <div className="coa-main__body" dangerouslySetInnerHTML={{__html: body}} />
      </div>
      <RelatedLinks
        relatedLinks={relatedLinks}
        sectionStyle="primary"
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

export default withRouteData(Services)
