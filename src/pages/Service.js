import React, { Component } from 'react';
import { get } from 'lodash';
import data from '__tmpdata/service_1';
import FormFeedback from 'components/FormFeedback';

class Service extends Component {

  render() {

    const topicId = get(data, "topic.id", null);
    const topicName = get(data, "topic.name", null);
    const title = get(data, "title", null);
    const steps = get(data, "steps", null);
    const body = get(data, "body", null);
    const phone = get(data, "phone", null);
    const email = get(data, "email", null);
    const address = get(data, "address", null);
    const hours = get(data, "hours", null);
    const app = get(data, "app", null);
    const related = get(data, "related", null);

    return (
      <div>

        <div className="coa-section">
          <a className="coa-page_breadcrumb" href={`/services/${topicId}`}>{topicName}</a>
          <h3 className="coa-page_title">{title}</h3>
          { steps && (
              <ol>{ steps.map((step) => { return <li>{step}</li> }) }</ol>
          )}
        </div>

      { app && (
        <div className="coa-section">
          <h4>{app.title}</h4>
          INSERT {app.type} app HERE
        </div>
      )}

      { body && (
        <div className="coa-section" dangerouslySetInnerHTML={{__html: body}} />
      )}

      { (phone || email || address || hours) && (
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
                Object.entries(hours).map((hour) => {
                  return (
                    <tr>
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

      { related && (
        <div className="coa-section coa-section--grey">
          <h4 className="coa-section__title">Use related services</h4>
          {
            related.map((service) => {
              return (
                <a className="coa-list_link coa-list_link--box bg-white" href={`/service/${service.id}`}>
                  <span>{service.name}</span>
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
              );
            })
          }
          <a className="coa-section__link" href={`/services/topic/${topicId}`}>See all services under {topicName}</a>
        </div>
      )}

        <div className="coa-section">
          <FormFeedback />
          <a className="coa-section__link" href="#">Return to Top</a>
        </div>

      </div>
    );
  }

}

export default Service;
