import React, { useState, useEffect } from 'react';

import OfficialDocumentEntry from 'components/Pages/OfficialDocuments/OfficialDocumentEntry';
import UserFeedback from 'components/UserFeedback';
import PaginationFiltered from 'components/PageSections/Pagination/PaginationFiltered.js';

const OfficialDocumentPaginationPage = ({ officialDocuments }) => (
  <div id="officialDocumentsPaginationPage">
    <PaginationFiltered
      filterable
      pagesArray={officialDocuments}
      PageComponent={OfficialDocumentEntry}
    />
  </div>
);

export default OfficialDocumentPaginationPage;
