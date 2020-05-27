import React, { useState, useEffect  } from 'react'
import { injectIntl } from 'react-intl'

import OfficialDocument from 'components/Pages/OfficialDocuments/OfficialDocument'
import UserFeedback from 'components/UserFeedback';
import PaginationContainer from 'components/PageSections/Pagination/paginationContainer.js'

const OfficialDocumentPage = ({ officialDocuments, intl }) => {

  return (
    <div>
      <div id="officialDocumentsPage" className="wrapper container-fluid">
        <div className="row">

          <PaginationContainer
            pagesArray={officialDocuments.edges}
            PageComponent={OfficialDocument}
            intl={intl}
          />

        </div>
        <UserFeedback />
      </div>
    </div>
  )

}

export default OfficialDocumentPage
