import React from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import ContextualNav from 'components/PageSections/ContextualNav';
import PageHeader from 'components/PageHeader';
import OfficialDocument from 'components/Pages/OfficialDocument';

const OfficialDocumentList = ({
  officialDocumentPage: {
    id,
    title,
    description,
    slug,
    topic,
    topics,
    theme,
    department,
    relatedDepartments,
    officialDocuments,
    coaGlobal,
    contextualNavData,
  },
  intl,
}) => {
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
        <div className="coa-Page__all-of-the-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-8">
                {officialDocuments.edges.map((document, index) => (
                  <OfficialDocument document={document.node} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(OfficialDocumentList));
