import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';

import OfficialDocument from 'components/Pages/OfficialDocuments/OfficialDocument';
import UserFeedback from 'components/UserFeedback';
import PaginationContainer from 'components/PageSections/Pagination/paginationContainer.js';

const OfficialDocumentPage = ({ officialDocuments, intl }) => {
  return (
    <div id="officialDocumentsPage">
      <PaginationContainer
        pagesArray={officialDocuments}
        PageComponent={OfficialDocument}
        intl={intl}
      />
      <UserFeedback />
    </div>
  );
};

export default OfficialDocumentPage;
