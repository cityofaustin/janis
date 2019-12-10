import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';

import WorkInProgress from 'components/WorkInProgress';
import PageNotificationBanner from 'components/PageNotificationBanner';
import HeroHome from 'components/HeroHome';
import ExternalLink from 'components/ExternalLink';
import SectionHeader from 'components/SectionHeader';

import TileGroup from 'components/Tiles/TileGroup';

const Home = ({ intl }) => {
  const { topServices, image } = useRouteData();

  return (
    <div className="coa-HeroHome__container">
      <Head>
        <title>{'City of Austin'}</title>
      </Head>

      <HeroHome
        imageFilename={`${process.env.CMS_MEDIA}/images/${image.file}`}
        imageTitle={image.title}
        preheader={intl.formatMessage(i18n2.welcomeTo)}
      />

      <TileGroup
        title={intl.formatMessage(i18n3.checkOutServices)}
        tiles={topServices}
      />
      {/* We are leaving it here because we might need it again.*/}
      {/*<PageNotificationBanner>*/}
      {/*  <WorkInProgress />*/}
      {/*</PageNotificationBanner>*/}
    </div>
  );
};

export default injectIntl(Home);
