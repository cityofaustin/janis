import React from 'react';

import { misc as i18n1 } from 'js/i18n/definitions';
import { injectIntl } from 'react-intl';
import HowYouKnowMenu from 'components/PageSections/HowYouKnowMenu';

const GovSite = ({ intl, toggleHowYouKnowMenu, keyboardHowYouKnowMenu, menuIsOpen, refnode }) => (
  <div
  	className={menuIsOpen ? "coa-Header__gov-site-open" : "coa-Header__gov-site"}
    // setting tabindex to 0 is the secret sauce that allowed this to be tab focusable
  	tabindex="0"
  	onKeyDown={keyboardHowYouKnowMenu}
  	ref={refnode}
  >
    <div
    	className="container-fluid wrapper center-xs"
    	onClick={toggleHowYouKnowMenu}
    >
      {intl.formatMessage(i18n1.coaOfficialWeb)}
      <span className="coa-Header__gov-site-toggle">
        {menuIsOpen ? <i className="material-icons">remove</i> : <i className="material-icons">add</i>}
      </span>
    </div>
     <HowYouKnowMenu open={menuIsOpen} />
  </div>
);

export default injectIntl(GovSite);
