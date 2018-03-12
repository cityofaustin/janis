import React from 'react';
import {get} from 'lodash';
import SectionTitle from 'js/modules/SectionTitle';
import SectionSubtitle from 'js/modules/SectionSubtitle';
import Hours from 'js/modules/Hours';
import StaticMap from 'js/modules/StaticMap';

const Contact = ({ contacts }) => {

  if (!contacts || !contacts.length) return null;

  return (
    <div className="coa-section">
      <SectionTitle title="Contact"/>
      {
        contacts.map((contact, index) => {

          const name = get(contact, "name", null);
          const phone = get(contact, "phone", null);
          const email = get(contact, "email", null);
          const location = get(contact, "location", null);
          const hours = get(contact, "hours", null);

          return (
            <div key={index} className="coa-section__subsection">

                <SectionSubtitle title={name} />

              { phone && (
                <div className="coa-section__map">
                  <h5>Phone Number</h5>
                  <a href={`tel:${phone}`}>{phone}</a>
                </div>
              )}

              { email && (
                <div className="coa-section__map">
                  <h5>Email</h5>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              )}

              { location && (
                <div className="coa-section__map">
                  <h5>Address</h5>
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

export default Contact;
