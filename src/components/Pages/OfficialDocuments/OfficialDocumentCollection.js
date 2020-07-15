import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import ContextualNav from 'components/PageSections/ContextualNav';
import PageHeader from 'components/PageHeader';
import OfficialDocumentPage from 'components/Pages/OfficialDocuments/OfficialDocumentPage';

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
        <PageHeader contentType={'official-document'} description={description}>
          {title}
        </PageHeader>
        <OfficialDocumentPage
          officialDocuments={documents}
          intl={intl}
        />
      </div>
    </div>
  );
};

export default injectIntl(OfficialDocumentCollection);