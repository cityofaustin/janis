import React from 'react';
import { withRouteData } from 'react-static';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { get } from 'lodash';

import SecondaryContentBanner from 'js/page_sections/SecondaryContentBanner';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';
import HeroHome from 'js/modules/HeroHome';
import ExternalLink from 'js/modules/ExternalLink';
import SectionHeader from 'js/modules/SectionHeader';
import TileGroup from 'js/modules/TileGroup';
import { cleanServiceLinks } from 'js/helpers/cleanData';

import jsonFileData from '__tmpdata/pages';
const services311 = get(jsonFileData, "services311", null);

const i18nMessages = defineMessages({
  homeRelatedlinksSectiontitle: {
    id: 'Home.RelatedLinks.SectionTitle',
    defaultMessage: 'Check out City of Austin services',
  },
  homeRelatedlinksTag: {
    id: 'Home.RelatedLinks.Tag',
    defaultMessage: 'Service',
  }
});

const Home = ({ topServices, image, intl }) => {
  const serviceLinks = cleanServiceLinks(topServices);

  return (
    <div>
      <HeroHome image={image} intl={intl} />
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
      <div className="wrapper container-fluid">
        <SectionHeader title={intl.formatMessage(i18nMessages.homeRelatedlinksSectiontitle)} />
        <TileGroup tiles={serviceLinks} tag={intl.formatMessage(i18nMessages.homeRelatedlinksTag)} />
      </div>
      <ThreeOneOne services311={services311} />
    </div>
  );
}

export default withRouteData(injectIntl(Home));
