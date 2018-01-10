import React, {Component} from 'react';
import {get} from 'lodash';
import SectionTitle from 'js/modules/SectionTitle';
import SectionSubtitle from 'js/modules/SectionSubtitle';
import Hours from 'js/modules/Hours';

class Contact extends Component {

  cleanContact(contact) {
    let cleaned = Object.assign(contact.contact);
    if(cleaned.hours) {
      cleaned.hours = cleaned.hours.edges.map(({ node: hours }) => hours);
    }
    return cleaned;
  }

  render() {

    const { contacts } = this.props;
    let JSX;

    if (!contacts || !contacts.length) {
      JSX = null;
    } else {
      JSX = (
        <div className="coa-section">
          <SectionTitle title="Contact" noBorder={true} />

          {
            contacts.map(({ node: contact }, index) => {

              const formattedContact = this.cleanContact(contact);
              const name = get(formattedContact, "name", null);
              const phone = get(formattedContact, "phone", null);
              const email = get(formattedContact, "email", null);
              const location = get(formattedContact, "location", null);
              const hours = get(formattedContact, "hours", null);

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

                  <Hours hours={hours} />

                </div>
              );

            })
          }
        </div>
      );
    }

    return JSX;
  }
}

export default Contact;
