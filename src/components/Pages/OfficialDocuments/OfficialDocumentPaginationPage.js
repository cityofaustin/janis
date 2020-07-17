import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';

import OfficialDocumentEntry from 'components/Pages/OfficialDocuments/OfficialDocumentEntry';
import UserFeedback from 'components/UserFeedback';
import PaginationContainer from 'components/PageSections/Pagination/paginationContainer.js';

const OfficialDocumentPaginationPage = ({ officialDocuments, intl }) => {
  console.log('OD', officialDocuments)
  return (
    <div id="officialDocumentsPaginationPage">
      <PaginationContainer
        pagesArray={officialDocuments}
        PageComponent={OfficialDocumentEntry}
        intl={intl}
      />
      <UserFeedback />
    </div>
  );
};

export default OfficialDocumentPaginationPage;