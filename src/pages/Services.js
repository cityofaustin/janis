import React, { Component } from 'react';
import { get } from 'lodash';
import data from '__tmpdata/services';

class ServicesIndex extends Component {

  render() {

    const services = get(data, "snippets.services", []);
    const services311 = get(data, "snippets.services311", []);

    return (
      <div>

        <div className="coa-hero">
          <div className="coa-hero__callout">
            <h1>{data.title}</h1>
          </div>
        </div>

        <div className="coa-body">
          {data.body}
        </div>

        <div className="coa-section">
          {
            services.map((service) => {
              return (
                <a className="coa-list_link coa-list_link--box" key={service.id} href={`service/${service.id}`}>
                  <span>{service.title}</span>
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
              );
            })
          }
        </div>

        <div className="coa-section coa-section--grey">
          <h3 className="coa-section__title">Send us feedback on this page or city services.</h3>
          <p className="usa-content">Prefer to talk to a person at 311? Call <a className="nowrap" tel="512-974-2000">512-974-2000</a>. </p>

          <form className="usa-form">
            <fieldset className="usa-fieldset-inputs usa-sans">
              <legend className="usa-sr-only">Site Feedback Options</legend>
              <ul className="usa-unstyled-list">
                <li>
                  <input id="page-content" type="radio" name="site-feedback-options" value="stanton" />
                  <label for="page-content">Information on this page</label>
                </li>
                <li>
                  <input id="technical-issue" type="radio" name="site-feedback-options" value="anthony" />
                  <label for="technical-issue">Technical Issue</label>
                </li>
                <li>
                  <input id="other" type="radio" name="site-feedback-options" value="tubman" />
                  <label for="other">Something else</label>
                </li>
              </ul>
            </fieldset>
            <input type="submit" value="Continue" />
          </form>

          <a>Return to Top</a>

        </div>

        <div className="coa-section">
          <h3 className="coa-section__title">Request 311 Service or Call <a className="nowrap" tel="512-974-2000">512-974-2000</a></h3>
          <p className="usa-content">311 is the city of Austin’s 24 hour information desk.</p>
        </div>

        <div className="coa-section coa-section--pad_lr">
        {
          services311.map((service) => {
            return (
              <a className="coa-list_link" key={service.id} href="#">
                <span>{service.title}</span>
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </a>
            );
          })
        }
        </div>

        <div className="coa-section">
          <a>See a Full List of 311 Services</a>
        </div>

      </div>
    );
  }

}

export default ServicesIndex;
