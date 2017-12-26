import React, { Component } from "react";
import ListLink from 'components/modules/ListLink';

class Service311 extends Component {

  render() {

    const { services311 } = this.props;

    return (services311) && (

      <div className="coa-section">
        <div className="wrapper">
          <div className="coa-section__title">
            <h3>Request 311 Service or Call <a className="nowrap" href="tel:512-974-2000">512-974-2000</a></h3>
          </div>
          <p>311 is the city of Austin’s 24 hour information desk.</p>

          <div className="row">
          {
            services311.map((service, index) =>
              <div key={index} className="col-xs-12 col-lg-4">
                <ListLink
                  url={service.url}
                  text={service.title}
                />
              </div>
            )
          }
          </div>
          <a className="coa-section__link" href="http://311.austintexas.gov/reports/list_services">See a Full List of 311 Services</a>
        </div>
      </div>
    );
  }
}

export default Service311;
