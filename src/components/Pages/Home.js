import React from 'react';
import { withRouteData } from 'react-static';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import SecondaryContentBanner from 'components/PageSections/SecondaryContentBanner/SecondaryContentBanner';
import HeroHome from 'components/HeroHome/HeroHome';
import ExternalLink from 'components/ExternalLink/ExternalLink';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';
import { cleanLinks } from 'js/helpers/cleanData';

const i18nMessages = defineMessages({
  homeRelatedlinksSectiontitle: {
    id: 'Home.RelatedLinks.SectionTitle',
    defaultMessage: 'Check out City of Austin services',
  },
  homeRelatedlinksTag: {
    id: 'Home.RelatedLinks.Tag',
    defaultMessage: 'Service',
  },
  homeHeroWelcometext: {
    id: 'Home.Hero.welcometext',
    defaultMessage: 'Welcome to',
  },
});

const Home = ({ topServices, image, intl }) => {
  //TODO: clean data where sourced
  const serviceLinks = cleanLinks(topServices, '/services');

  return (
    <div>
      <HeroHome
        imageUrl={`${process.env.CMS_MEDIA}/${image.file}`}
        imageTitle={image.title}
        preheader={intl.formatMessage(i18nMessages.homeHeroWelcometext)}
      />
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
        <TileGroup
          title={intl.formatMessage(i18nMessages.homeRelatedlinksSectiontitle)}
          tiles={serviceLinks}
          tag={intl.formatMessage(i18nMessages.homeRelatedlinksTag)}
        />
      </div>
    </div>
  );
}

export default withRouteData(injectIntl(Home));
