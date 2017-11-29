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
                <a className="coa-content_link coa-content_link--box" key={service.id}>
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
              <legend className="usa-sr-only">Historical figures 2</legend>
              <ul className="usa-unstyled-list">
                <li>
                  <input id="stanton" type="radio" name="historical-figures-2" value="stanton" />
                  <label for="stanton">Elizabeth Cady Stanton</label>
                </li>
                <li>
                  <input id="anthony" type="radio" name="historical-figures-2" value="anthony" />
                  <label for="anthony">Susan B. Anthony</label>
                </li>
                <li>
                  <input id="tubman" type="radio" name="historical-figures-2" value="tubman" />
                  <label for="tubman">Harriet Tubman</label>
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
          <div className="coa-section--tbonly">
            {
              services311.map((service) => {
                return (
                  <a className="coa-content_link" key={service.id}>
                    <span>{service.title}</span>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
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
