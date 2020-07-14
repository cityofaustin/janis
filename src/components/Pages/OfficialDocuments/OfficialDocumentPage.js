// import React, { useState, useEffect } from 'react';
// import { injectIntl } from 'react-intl';

// import OfficialDocumentEntry from 'components/Pages/OfficialDocuments/OfficialDocumentEntry';
// import UserFeedback from 'components/UserFeedback';
// import PaginationContainer from 'components/PageSections/Pagination/paginationContainer.js';

// const OfficialDocumentPaginationPage = ({ officialDocuments, intl }) => {
//   return (
//     <div id="officialDocumentsPage">
//       <PaginationContainer
//         pagesArray={officialDocuments}
//         PageComponent={OfficialDocumentEntry}
//         intl={intl}
//       />
//       <UserFeedback />
//     </div>
//   );
// };

// export default OfficialDocumentPage;


import React, { Fragment } from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import path from 'path';

import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';

import PageBanner from 'components/PageBanner';
import PageHeader from 'components/PageHeader';
import Steps from 'components/Steps';
import HtmlFromRichText from 'components/HtmlFromRichText';
import ApplicationBlock from 'components/ApplicationBlock';
import ContactDetails from 'components/Contact/ContactDetails';
import SectionHeader from 'components/SectionHeader';
import ContextualNav from 'components/PageSections/ContextualNav';
import RelatedToMobile from 'components/PageSections/ContextualNav/RelatedToMobile';
import PageIsPartOfContainer from 'components/PageSections/PageIsPartOfContainer';
import RelatedEvents from 'components/PageSections/RelatedEvents';
import UserFeedback from 'components/UserFeedback';

const OfficialDocumentPage = ({ officialDocumentPage, intl }) => {
  const {
    officialDocumentPage: {
      title,
      description,
      // additionalContent,
      // contact,
      contextualNavData,
      pageIsPartOf, // what is this?
    },
    // not the biggest fan of this logic but
    // it gets previews working with hooks
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
        {!pageIsPartOf ? (
          <PageHeader contentType={'officialDocumentPage'} description={description}> {/*chia*/} 
            {title}
          }
          </PageHeader>
        ) : (
          <PageIsPartOfContainer
            pageIsPartOf={pageIsPartOf}
            contentType={'information'}
            description={description}
            title={title}
            intl={intl}
          />
        )}

        <div className="coa-Page__all-of-the-content">
          <div className="coa-Page__main-content">
            <div className="wrapper container-fluid">
              <div className="row">
                <div className="col-xs-12 col-md-10">
                  {additionalContent && (
                    <HtmlFromRichText title={' '} content={additionalContent} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="coa-Page__side-content">
          </div>
        </div>
        {!coaGlobal && (
          <RelatedToMobile
            relatedTo={contextualNavData.relatedTo}
            offeredBy={contextualNavData.offeredBy}
          />
        )}
      </div>
      <UserFeedback />
    </div>
  );
};

export default injectIntl(OfficialDocumentPage);
