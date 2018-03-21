import React from 'react';
import { withRouteData } from 'react-static';
import { get } from 'lodash';
import { cleanServiceLinks } from 'js/helpers/cleanData';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
import Hero from 'js/modules/Hero';
import TileGroup from 'js/modules/TileGroup';
import FormFeedback from 'js/page_sections/FormFeedback';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';

const Topic = ({ topic }) => {
  const title = get(topic, "text", null);
  const body = get(topic, "description", null);
  const links = get(topic, "services", null);
  const relatedLinks = cleanServiceLinks(links);
  const services311 = get(jsonFileData, "services311", null);

  return (
    <div>
      <Hero callout={title} />

      <div className="wrapper">
        <div className="coa-main__body" dangerouslySetInnerHTML={{__html: body}} />
      </div>

      <TileGroup tiles={relatedLinks} />

      <div className="coa-section coa-section--lightgrey">
        <div className="wrapper">
          <FormFeedback />
          <a className="coa-section__link" href="#">Return to Top</a>
        </div>
      </div>

      <ThreeOneOne services311={services311} />
    </div>
  )
}

export default withRouteData(Topic);
