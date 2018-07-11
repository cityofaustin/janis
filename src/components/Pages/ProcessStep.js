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
import HtmlFromAdmin from 'components/HtmlFromAdmin';
import ContactDetails from 'components/Contact/ContactDetails';

const ProcessStep = ({
  processStep: {
    processTitle,
    processUrl,
    badges,
    title,
    sortOrder,
    description,
    image,
    topic,
    topic: { theme },
    detailedContent,
    contacts,
  },
  intl,
}) => {
  const updatedBadges = [
    {
      text: intl.formatMessage(i18n.overview),
      url: processUrl,
    },
  ].concat(badges);

  return (
    <div>
      {image && (
        <PageBanner
          imagesPath={`${process.env.CMS_MEDIA}/images`}
          imageFilename={path.basename(
            image.filename,
            path.extname(image.filename),
          )}
          imageExtension={path.extname(image.filename)}
          imageTitle={image.title}
        />
      )}
      <PageBreadcrumbs
        grandparent={{ ...theme, subpath: 'themes' }}
        parent={{ ...topic, subpath: 'topics' }}
        title={processTitle}
      />
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader>{processTitle}</PageHeader>
      </div>
      <div className="wrapper container-fluid">
        <BadgeGroup badges={updatedBadges} activeIndex={sortOrder} />
      </div>
      <div className="wrapper wrapper--sm wrapper--hasBorder container-fluid">
        <SectionHeader description={description} symbol={sortOrder}>
          {title}
        </SectionHeader>
      </div>
      <div className="wrapper wrapper--sm container-fluid">
        <HtmlFromAdmin content={detailedContent} />
        {!!contacts &&
          !!contacts.length && <ContactDetails contact={contacts[0]} />}
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(ProcessStep));
