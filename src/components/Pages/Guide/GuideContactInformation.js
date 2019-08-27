import React from 'react';

import Phone from 'components/Contact/Phone';
import Email from 'components/Contact/Email';

const GuideContactInformation = ({
  contact: {
    name,
    phone,
    email
  },
}) => {
  if (phone) {
    phone = JSON.parse(phone);
  }

  return (
    <div>
      <h1>Contact information</h1>
      <div className="coa-GuidePage__contact-block row">
        {name && (
          <div className="coa-GuidePage__contact-block-name col-md-6">
            <h2>{name}</h2>
          </div>
        )}
        <div className="coa-GuidePage__contact-block-info col-md-6">
          {phone && (
            <div className="coa-GuidePage__contact-block-phone">
              <Phone phone={phone} />
            </div>
          )}
          {email && (
            <div className="coa-GuidePage__contact-block-email">
              <Email email={email} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideContactInformation;
