import React from 'react';
import { injectIntl } from 'react-intl';

import Phones from 'components/Contact/Phones';
import Email from 'components/Contact/Email';
import { misc as i18n1 } from 'js/i18n/definitions';

const GuideContactInformation = ({
  contact: {
    name,
    phoneNumbers,
    email
  },
  intl,
}) => {
  return (
    <div className="coa-GuideSection__collection">
      <h1 className="coa-GuideSection__header">{intl.formatMessage(i18n1.contactInformation)}</h1>
      <div className="row coa-GuideSection__container">
        {name && (
          <div className="col-xs-12 col-md-6 coa-GuidePage__contact-block coa-GuidePage__contact-name">
            <h2>{name}</h2>
          </div>
        )}
        <div className="col-xs-12 col-md-6 coa-GuidePage__contact-block coa-GuidePage__contact-info">
          {phoneNumbers && (
            <div className="coa-GuidePage__contact-item">
              <Phones phoneNumbers={phoneNumbers} />
            </div>
          )}
          {email && (
            <div className="coa-GuidePage__contact-item">
              <Email email={email} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(GuideContactInformation);
