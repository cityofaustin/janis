import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import HtmlFromRichText from 'components/HtmlFromRichText';
import ContextualNav from 'components/PageSections/ContextualNav';
import PageHeader from 'components/PageHeader';
import OfficialDocumentPaginationPage from 'components/Pages/OfficialDocuments/OfficialDocumentPaginationPage';

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

  console.log("documents :", documents)

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
          subDescription={documents.length > 0 && documents.length}
        >
          {title}
        </PageHeader>

        <OfficialDocumentPaginationPage
          officialDocuments={documents}
          intl={intl}
        />
      </div>
    </div>
  );
};

export default injectIntl(OfficialDocumentCollection);
