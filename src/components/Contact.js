import React, {Component} from 'react';

class Contact extends Component {

  render() {

    const {phone, email, address, hours} = this.props;

    return (

      <div>

      {(phone || email || address || hours) && (

        <div className="coa-section">
          <h4>Contact</h4>

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
            <span>{address.city}, {address.state} {address.zip} </span>
            <span>{address.country}</span>
          </div>
        )}

        { hours && (
          <div className="coa-section__map">
            <h5>Hours</h5>
            <table className="usa-table-borderless">
              <thead className="usa-sr-only">
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Open - Close Hours</th>
                </tr>
              </thead>
              <tbody>
              {
                Object.entries(hours).map((hour, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{hour[0]}</th>
                      <td>{hour[1]}</td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>

        )}

        </div>

      )}
      </div>
    );
  }
}

export default Contact;
