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
    <div className="coa-GuideSection__collection">
      <h1 className="coa-GuideSection__header">Contact information</h1>
      <div className="row coa-GuideSection__container">
        {name && (
          <div className="col-xs-12 col-md-6 coa-GuidePage__contact-block coa-GuidePage__contact-name">
            <h2>{name}</h2>
          </div>
        )}
        <div className="col-xs-12 col-md-6 coa-GuidePage__contact-block coa-GuidePage__contact-info">
          {phone && (
            <div className="coa-GuidePage__contact-item">
              <Phone phone={phone} />
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

export default GuideContactInformation;
