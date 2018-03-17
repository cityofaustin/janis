import React from 'react';
import { withRouteData } from 'react-static';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { get } from 'lodash';

import SecondaryContentBanner from 'js/page_sections/SecondaryContentBanner';
import Service311 from 'js/page_sections/Service311';
import HeroHome from 'js/modules/HeroHome';
import ExternalLink from 'js/modules/ExternalLink';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import homepageImg from 'images/lady_bird_lake.jpg';
import { cleanServiceLinks } from 'js/helpers/cleanData';

import jsonFileData from '__tmpdata/pages';
const services311 = get(jsonFileData, "services311", null);

const i18nMessages = defineMessages({
  homeHeroWelcometext: {
    id: 'Home.Hero.welcometext',
    defaultMessage: 'Hi there, welcome to',
    description: 'Homepage hero welcome text'
  },
  homeRelatedlinksSectiontitle: {
    id: 'Home.RelatedLinks.SectionTitle',
    defaultMessage: 'Use City of Austin Services',
  }
});

const Home = ({ topServices, image, intl }) => {
  const serviceLinks = cleanServiceLinks(topServices);

  return (
    <div>
      <HeroHome image={image}>
        <div className="coa-Hero__home-children">
          <span className="coa-Hero__home-preheader">{intl.formatMessage(i18nMessages.homeHeroWelcometext)}</span>
          <h2 className="coa-Hero__home-header">Austin, TX</h2>
          {/* <GlobalSearch /> */}
        </div>
      </HeroHome>
      <SecondaryContentBanner>
        <p>
        <FormattedMessage
          id="Home.Secondarycontent.bodytext"
          defaultMessage="Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit  {citySiteLink}. Learn more about the new website at {projectsSiteLink}."
          values = {{
            citySiteLink: <ExternalLink to="https://austintexas.gov">austintexas.gov</ExternalLink>,
            projectsSiteLink: <ExternalLink to="https://bit.ly/atx-digital-services">projects.austintexas.io</ExternalLink>
          }}
        />
        </p>
      </SecondaryContentBanner>
      <RelatedLinks
        sectionTitle={intl.formatMessage(i18nMessages.homeRelatedlinksSectiontitle)}
        relatedLinks={serviceLinks}
        style="primary"
      />
      <Service311 services311={services311} />
    </div>
  );
}

export default withRouteData(injectIntl(Home));
