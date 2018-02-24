import React, { Component } from 'react';
import { getRouteProps } from 'react-static';
import { get } from 'lodash';

import SecondaryContentBanner from 'js/page_sections/SecondaryContentBanner';
import Service311 from 'js/page_sections/Service311';
import GlobalSearch from 'js/modules/GlobalSearch';
import Hero from 'js/modules/Hero';
import ExternalLink from 'js/modules/ExternalLink';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import homepageImg from 'images/lady_bird_lake.jpg';

import jsonFileData from '__tmpdata/services';
const services311 = get(jsonFileData, "services311", null);

import { cleanServiceLinks } from 'js/helpers/cleanData';


const Home = ({ allServicePages }) => {
  const serviceLinks = cleanServiceLinks(allServicePages).slice(0,4);

  const homepageImage = {
    file: homepageImg,
    title: 'Lady Bird Lake walking trail',
  }

  const bannerContent = () => (
    <p>
      Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit <ExternalLink to="https://austintexas.gov">austintexas.gov</ExternalLink>. Learn more about the new website at <ExternalLink to="https://bit.ly/atx-digital-services">projects.austintexas.io</ExternalLink>.
    </p>
  )

  return (
    <div>
      <Hero home={true} image={homepageImage}>
        <span className="coa-Hero__home-preheader">Welcome to</span>
        <h2 className="coa-Hero__home-header">Austin, TX</h2>
        <GlobalSearch placeholder="Search for services" />
      </Hero>
      <SecondaryContentBanner content={bannerContent()} />
      <RelatedLinks
        sectionTitle="Use City of Austin Services"
        relatedLinks={serviceLinks}
        style="primary"
      />
      <Service311 services311={services311} />
    </div>
  );
}

export default getRouteProps(Home);
