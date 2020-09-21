import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import HtmlFromRichText from 'components/HtmlFromRichText';
import ContextualNav from 'components/PageSections/ContextualNav';
import PageHeader from 'components/PageHeader';
import OfficialDocumentPaginationPage from 'components/Pages/OfficialDocuments/OfficialDocumentPaginationPage';
import UserFeedback from 'components/UserFeedback';

const OfficialDocumentCollection = ({ officialDocumentCollection, intl }) => {
  const {
    officialDocumentCollection: {
      id,
      title,
      description,
      slug,
      topic,
      topics,
      theme,
      department,
      documents,
      coaGlobal,
      contextualNavData,
    },
  } = officialDocumentCollection ? { officialDocumentCollection } : useRouteData();

  const descriptonBlock = <HtmlFromRichText content={description} />

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
        <PageHeader contentType={'official-document'} description={descriptonBlock}>
          {title}
        </PageHeader>
        <OfficialDocumentPaginationPage
          officialDocuments={documents}
          intl={intl}
        />
        <UserFeedback />
      </div>
    </div>
  );
};

export default injectIntl(OfficialDocumentCollection);
