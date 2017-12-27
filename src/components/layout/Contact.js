import React, {Component} from 'react';
import {get} from 'lodash';
import SectionTitle from 'components/modules/SectionTitle';
import SectionSubtitle from 'components/modules/SectionSubtitle';
import Hours from 'components/modules/Hours';

class Contact extends Component {

  render() {

    const { contacts } = this.props;

    return (contacts) && (

      <div className="coa-section">
        <SectionTitle title="Contact" noBorder={true} />

        {
          contacts.map((contact, index) => {

            const name = get(contact, "name", null);
            const phone = get(contact, "phone", null);
            const email = get(contact, "email", null);
            const address = get(contact, "address", null);
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

                { address && (
                  <div className="coa-section__map">
                    <h5>Address</h5>
                    <span>{address.street}</span>
                    <span>{address.city}, {address.state} {address.zip}</span>
                    <span>{address.country}</span>
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
}

export default Contact;
