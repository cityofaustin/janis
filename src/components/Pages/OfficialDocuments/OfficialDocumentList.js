import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import ContextualNav from 'components/PageSections/ContextualNav';
import PageHeader from 'components/PageHeader';
import OfficialDocumentPage from 'components/Pages/OfficialDocuments/OfficialDocumentPage';

const OfficialDocumentList = ({ officialDocumentPage, intl }) => {
  const {
    officialDocumentPage: {
      id,
      title,
      description,
      slug,
      topic,
      topics,
      theme,
      department,
      officialDocuments,
      coaGlobal,
      contextualNavData,
    },
  } = officialDocumentPage ? { officialDocumentPage } : useRouteData();

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
          officialDocuments={officialDocuments}
          intl={intl}
        />
      </div>
    </div>
  );
};

export default injectIntl(OfficialDocumentList);
