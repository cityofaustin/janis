import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import SectionTitle from 'js/modules/SectionTitle';
import SectionSubtitle from 'js/modules/SectionSubtitle';
import Hours from 'js/modules/Hours';
import StaticMap from 'js/modules/StaticMap';

const i18nMessages = defineMessages({
  contactPhoneTitle: {
    id: 'Contact.phone.title',
    defaultMessage: 'Phone Number',
  },
  contactEmailTitle: {
    id: 'Contact.email.title',
    defaultMessage: 'Email',
  },
  contactAddressTitle: {
    id: 'Contact.address.title',
    defaultMessage: 'Address',
  },
});

const Contact = ({ contacts, intl }) => {

  if (!contacts || !contacts.length) return null;

  return (
    <div className="coa-section">
      <SectionTitle title="Contact"/>
      {
        contacts.map((contact, index) => {

          const {name, phone, email, location, hours} = contact;

          return (
            <div key={index} className="coa-section__subsection">

                <SectionSubtitle title={name} />

              { phone && (
                <div className="coa-section__map">
                  <h5>{intl.formatMessage(i18nMessages.contactPhoneTitle)}</h5>
                  <a href={`tel:${phone}`}>{phone}</a>
                </div>
              )}

              { email && (
                <div className="coa-section__map">
                  <h5>{intl.formatMessage(i18nMessages.contactEmailTitle)}</h5>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              )}

              { location && (
                <div className="coa-section__map">
                  <h5>{intl.formatMessage(i18nMessages.contactAddressTitle)}</h5>
                  <span>{location.street}</span>
                  <span>{location.city}, {location.state} {location.zip}</span>
                  <span>{location.country}</span>
                </div>
              )}

              { location && (
                <StaticMap location={location} title={`Map to ${name}`}/>
              )}

              <Hours hours={hours} />

            </div>
          );

        })
      }
    </div>
  );
}

export default injectIntl(Contact);
