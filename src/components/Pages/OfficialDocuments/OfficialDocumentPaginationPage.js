import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';

import OfficialDocumentEntry from 'components/Pages/OfficialDocuments/OfficialDocumentEntry';
import UserFeedback from 'components/UserFeedback';
import PaginationContainer from 'components/PageSections/Pagination/paginationContainer.js';

const OfficialDocumentPaginationPage = ({ officialDocuments, intl }) => (
  <div id="officialDocumentsPaginationPage">
    <PaginationContainer
      filterable
      pagesArray={officialDocuments}
      PageComponent={OfficialDocumentEntry}
      intl={intl}
    />
  </div>
);

export default OfficialDocumentPaginationPage;
