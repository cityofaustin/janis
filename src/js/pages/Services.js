import React from 'react';
import { withRouteData } from 'react-static';
import { get } from 'lodash';

import Hero from 'js/modules/Hero';
import TileGroup from 'js/modules/TileGroup';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';

import { cleanServiceLinks } from 'js/helpers/cleanData';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
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
      <TileGroup tiles={relatedLinks} />
      <ThreeOneOne services311={services311} />
    </div>
  )
}

export default withRouteData(Services)
