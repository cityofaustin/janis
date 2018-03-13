import React, { Component } from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import { get } from 'lodash';

import SecondaryContentBanner from 'js/page_sections/SecondaryContentBanner';
import Service311 from 'js/page_sections/Service311';
import GlobalSearch from 'js/modules/GlobalSearch';
import Hero from 'js/modules/Hero';
import ExternalLink from 'js/modules/ExternalLink';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import homepageImg from 'images/lady_bird_lake.jpg';
import { cleanServiceLinks } from 'js/helpers/cleanData';

import jsonFileData from '__tmpdata/services';
const services311 = get(jsonFileData, "services311", null);

const i18nMessages = defineMessages({
  homeHeroWelcometext: {
    id: 'Home.Hero.welcometext',
    defaultMessage: 'Hi there, welcome to',
    description: 'Homepage hero welcome text'
  },
});

const Home = ({ topServices, intl }) => {
  const serviceLinks = cleanServiceLinks(topServices);

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
        <span className="coa-Hero__home-preheader">{intl.formatMessage(i18nMessages.homeHeroWelcometext)}</span>
        <h2 className="coa-Hero__home-header">Austin, TX</h2>
        {/* <GlobalSearch placeholder="Search for services" /> */}
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

export default withRouteData(injectIntl(Home));
