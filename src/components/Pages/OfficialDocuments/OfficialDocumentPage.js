import React, { useState, useEffect  } from 'react'
import { injectIntl } from 'react-intl'
import { navigation as i18n2 } from 'js/i18n/definitions';
import { useMobileQuery } from 'js/helpers/reactMediaQueries.js';
import { scrollTransition } from 'js/animations/scrollTransition.js';
import { buildPages, buildPagination } from 'js/helpers/pagination.js'

import ChevronRight from 'components/SVGs/ChevronRight'
import ChevronLeftBlue from 'components/SVGs/ChevronLeftBlue'
import ChevronRightBlue from 'components/SVGs/ChevronRightBlue'
import OfficialDocument from 'components/Pages/OfficialDocuments/OfficialDocument'
import UserFeedback from 'components/UserFeedback';
import { PageNumber } from 'components/PageSections/Pagination'
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
