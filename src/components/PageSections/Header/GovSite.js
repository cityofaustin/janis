import React from 'react';

import { misc as i18n1 } from 'js/i18n/definitions';
import { injectIntl } from 'react-intl';
import HowYouKnowMenu from 'components/PageSections/HowYouKnowMenu';

const GovSite = ({ intl, toggleHowYouKnowMenu, menuIsOpen, refnode }) => (
  <div className="coa-Header__gov-site" tabindex="0">
    <div className="container-fluid wrapper center-xs" style={{	tabindex: 0}} onClick={toggleHowYouKnowMenu}>
      {intl.formatMessage(i18n1.coaOfficialWeb)}
      <span className="coa-Header__gov-site-toggle">
        {menuIsOpen ? <i className="material-icons">remove</i> : <i className="material-icons">add</i>}
      </span>
    </div>
     <HowYouKnowMenu open={menuIsOpen} refnode={refnode}/>
  </div>
);

export default injectIntl(GovSite);
