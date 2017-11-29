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
          <div className="coa-hero-callout">
            <h1>{data.title}</h1>
          </div>
        </div>

        <p>
          {data.body}
        </p>

        <div className="coa-section coa-content_links">
          {
            services.map((service) => {
              return (
                <a className="coa-content_link coa-content_link--box" key={service.id}>
                  <span>{service.title}</span>
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
              );
            })
          }
        </div>

        <div className="coa-section coa-section--grey">
          <h2 className="coa-section_title">Request 311 Service or Call 512-974-2000</h2>
          <div className="coa-section_body usa-content">311 is the city of Austin’s 24 hour information desk.</div>
          <div className="coa-section coa-content_links">
            {
              services311.map((service) => {
                return (
                  <a className="coa-content_link" key={service.id}>
                    <span>{service.title}</span>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                  </a>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }

}

export default ServicesIndex;
