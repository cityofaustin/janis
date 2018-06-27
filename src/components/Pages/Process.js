import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';
import path from 'path';

import { misc as i18n } from 'js/i18n/definitions';

import PageBanner from 'components/PageBanner';
import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import BadgeGroup from 'components/Badges/BadgeGroup';
import SectionHeader from 'components/SectionHeader';
import StepDetailGroup from 'components/Steps/StepDetailGroup';
import ListSVG from 'components/SVGs/List';

const Process = ({
  process: {
    title,
    text,
    url,
    image,
    topic,
    topic: { theme },
    description,
    processSteps,
  },
  intl,
}) => {
  const badges = processSteps.map(({ shortTitle, url, sortOrder }) => ({
    text: shortTitle,
    url: url,
    symbol: sortOrder,
  }));
  badges.unshift({
    text: intl.formatMessage(i18n.overview),
    url: url,
    isActive: true,
  });
  const stepDetailGroup = processSteps.map(
    ({ title, sortOrder, linkTitle, url, overviewSteps }) => ({
      title: `${sortOrder}. ${title}`,
      link: { text: linkTitle, url: url },
      content: overviewSteps,
    }),
  );
  return (
    <div>
      <PageBanner
        imagesPath={`${process.env.CMS_MEDIA}/images`}
        imageFilename={path.basename(
          image.filename,
          path.extname(image.filename),
        )}
        imageExtension={path.extname(image.filename)}
        imageTitle={image.title}
      />
      <PageBreadcrumbs
        grandparent={{ ...theme, subpath: 'themes' }}
        parent={{ ...topic, subpath: 'topics' }}
        title={title}
      />
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader>{title}</PageHeader>
      </div>
      <div className="wrapper container-fluid">
        <BadgeGroup badges={badges} hasBorder={true} />
      </div>
      <div className="wrapper wrapper--sm wrapper--hasBorder container-fluid">
        <SectionHeader description={description} symbol={<ListSVG />}>
          {intl.formatMessage(i18n.overview)}
        </SectionHeader>
      </div>
      <StepDetailGroup steps={stepDetailGroup} stepClassName="wrapper--sm" />
    </div>
  );
};

export default withRouteData(injectIntl(Process));
