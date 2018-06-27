import React from 'react';
import { withRouteData } from 'react-static';
import path from 'path';

import PageBanner from 'components/PageBanner';
import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import BadgeGroup from 'components/Badges/BadgeGroup';
import SectionHeader from 'components/SectionHeader';
import HtmlFromAdmin from 'components/HtmlFromAdmin';

const ProcessStep = ({
  processStep: {
    processTitle = 'Test Page Title',
    badges = [],
    title,
    sortOrder,
    description,
    image,
    topic = {
      slug: 'foster-animal',
      text: 'Foster an animal',
      theme: { slug: 'pets', text: 'Pets' },
    },
    // topic: { theme = { slug: 'pets', text: 'Pets' } },
    theme = { slug: 'pets', text: 'Pets' },
    detailedContent,
  },
}) => (
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
      title={processTitle}
    />
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader>{processTitle}</PageHeader>
    </div>
    <div className="wrapper container-fluid">
      <BadgeGroup badges={badges} hasBorder={true} />
    </div>
    <div className="wrapper wrapper--sm wrapper--hasBorder container-fluid">
      <SectionHeader description={description} symbol={sortOrder}>
        {title}
      </SectionHeader>
    </div>
    <div className="wrapper wrapper--sm container-fluid">
      <HtmlFromAdmin content={detailedContent} />
    </div>
  </div>
);

export default withRouteData(ProcessStep);
