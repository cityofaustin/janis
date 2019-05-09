import React from 'react';
import { withRouteData, Head } from 'react-static';
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
import ContactDetails from 'components/Contact/ContactDetails';

const Process = ({
  process: {
    title,
    badges,
    text,
    url,
    image = {},
    topic,
    description,
    stepDetailGroup,
    contacts,
  },
  intl,
}) => {
  const updatedBadges = [
    {
      text: intl.formatMessage(i18n.overview),
      url: url,
    },
    ...badges,
  ];

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {image && (
        <PageBanner
          imagesPath={`${process.env.CMS_MEDIA}/images`}
          imageFilename={path.basename(
            image.filename,
            path.extname(image.filename),
          )}
          imageExtension={path.extname(image.filename).substring(1)}
          imageTitle={image.title}
        />
      )}
      <PageBreadcrumbs parent={{ ...topic, subpath: 'topics' }} title={title} />
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader>{title}</PageHeader>
      </div>
      <div className="wrapper container-fluid">
        <BadgeGroup badges={updatedBadges} activeIndex={0} />
      </div>
      <div className="wrapper wrapper--sm wrapper--hasBorder container-fluid">
        <SectionHeader description={description} symbol={<ListSVG />}>
          {intl.formatMessage(i18n.overview)}
        </SectionHeader>
      </div>
      <StepDetailGroup steps={stepDetailGroup} stepClassName="wrapper--sm" />
      {!!contacts && !!contacts.length && (
        <div className="wrapper wrapper--sm container-fluid">
          <ContactDetails contact={contacts[0]} />
        </div>
      )}
    </div>
  );
};

export default withRouteData(injectIntl(Process));
