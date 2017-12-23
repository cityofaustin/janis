import React, {Component} from 'react';
import Hours from 'components/Hours';

class Contact extends Component {

  render() {

    const { phone, email, address, hours } = this.props;

    return (phone || email || address || hours) && (

      <div className="coa-section">
        <h4 className="coa-section__title--noborder">Contact</h4>

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
          <h5>{address.name}</h5>
          <span>{address.street}</span>
          <span>{address.city}, {address.state} {address.zip}</span>
          <span>{address.country}</span>
        </div>
      )}

        <Hours hours={hours} />

      </div>
    );
  }
}

export default Contact;
