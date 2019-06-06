import React from 'react';

import DomeSVG from 'components/SVGs/Dome';
import { misc as i18n1, navigation as i18n2 } from 'js/i18n/definitions';
import { injectIntl } from 'react-intl';

const GovSite = ({ intl, menuIsOpen }) => (
  <div className="coa-Header__gov-site">
    <div className="container-fluid wrapper center-xs">
      {intl.formatMessage(i18n1.coaOfficialWeb)}
      <span className="coa-Header__gov-site-toggle">
        {menuIsOpen ? (
          <i className="material-icons">remove</i>
        ) : (
          <i className="material-icons">add</i>
        )}
      </span>
    </div>
  </div>
);

export default injectIntl(GovSite);
