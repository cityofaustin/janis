import React from 'react';
import { useIntl } from 'react-intl';
import { useRouteData, Head } from 'react-static';
import { misc as i18n } from 'js/i18n/definitions';

import HtmlFromRichText from 'components/HtmlFromRichText';
import ContextualNav from 'components/PageSections/ContextualNav';
import PageHeader from 'components/PageHeader';
import OfficialDocumentEntry from 'components/Pages/OfficialDocuments/OfficialDocumentEntry';
import PaginationFiltered from 'components/PageSections/Pagination/PaginationFiltered.js';
import UserFeedback from 'components/UserFeedback';
import { createDateFromString } from 'js/helpers/date';

/**
  @param CMS_API
    CMSPreview will pass through CMS_API
    Defaults to process.env.CMS_API if CMS_PREVIEW doesn't include explicit CMS_API param
**/
const OfficialDocumentCollection = ({ officialDocumentCollection, CMS_API=process.env.CMS_API }) => {
  const intl = useIntl();
  const {
    officialDocumentCollection: {
      pageId,
      title,
      description,
      documentsCount,
      coaGlobal,
      contextualNavData,
      lowerBound, // DateString "YYYY-MM-DD"
    },
  } = officialDocumentCollection ? { officialDocumentCollection } : useRouteData();

  const descriptonBlock = <HtmlFromRichText content={description} />

  let subDescription = documentsCount + " "
  if (documentsCount === 1) {
    subDescription += intl.formatMessage(i18n.documentsTotal)
  } else {
    subDescription += intl.formatMessage(i18n.documentsTotalPlural)
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {!coaGlobal && (
        <ContextualNav
          parent={contextualNavData.parent}
          relatedTo={contextualNavData.relatedTo}
          offeredBy={contextualNavData.offeredBy}
        />
      )}
      <div>
        <PageHeader
          contentType={'official-document'}
          description={descriptonBlock}
          subDescription={subDescription}
        >
          {title}
        </PageHeader>
        <PaginationFiltered
          PageComponent={OfficialDocumentEntry}
          lowerBound={createDateFromString(lowerBound)}
          officialDocumentCollectionId={pageId}
          CMS_API={CMS_API}
        />
        <UserFeedback />
      </div>
    </div>
  );
};

export default OfficialDocumentCollection;
