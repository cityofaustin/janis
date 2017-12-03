import React, { Component } from 'react';
import FormFeedback from 'components/FormFeedback';

class Service extends Component {

  render() {

    const title = "Look up recycling, compost, and trash pick-up days";
    const topicId = "1";
    const topicArea = "Manage Utilities and Resources";

    return (
      <div>

        <div className="coa-section">
          <a className="coa-page_breadcrumb" href={`/services/${topicId}`}>{topicArea}</a>
          <h3 className="coa-page_title">{title}</h3>
          <ol>
            <li>Type your address, without apartment number, in the box below</li>
            <li>Press the search button to view your schedule</li>
            <li>(optional) Click to add your schedule to your Google, iCal, or Microsoft calendar or click to print a copy</li>
          </ol>
        </div>

        <div className="coa-section">
          <h4 className="coa-section__subtitle">Use this form to look up your schedule</h4>
          INSERT IFRAME/FORM HERE
        </div>

        <div className="coa-section coa-section--pad_tlr">
          <h4 className="coa-section__subtitle">Apartments or Condos</h4>
          If you live in an apartment or condo, do not enter your unit number.
        </div>

        <div className="coa-section coa-section--pad_tlr">
          <h4 className="coa-section__subtitle">Holidays</h4>
          Service is postponed by one day during holiday weeks: Thanksgiving, Christmas, and New Year’s Day, unless the holiday falls on a Sunday.
        </div>

        <div className="coa-section">
          <h4 className="coa-section__subtitle">Contact</h4>
          <div className="coa-section__map">
            <h5>Phone Number</h5>
            <a href="tel:512-367-8695">512-367-8695</a>
          </div>

          <div className="coa-section__map">
            <h5>Email</h5>
            <a href="mailto:resourcerecovery@austintexas.gov">resourcerecovery@austintexas.gov</a>
          </div>

          <div className="coa-section__map">
            <h5>Austin Recycle and Reuse Drop-off Center</h5>
            <span>2514 Business Center Drive </span>
            <span>Austin, Texas 78744 </span>
            <span>United States</span>
          </div>

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
                <tr>
                  <th scope="row">Monday</th>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <th scope="row">Tuesday</th>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <th scope="row">Wednesday</th>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <th scope="row">Thursday</th>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <th scope="row">Friday</th>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <th scope="row">Saturday</th>
                  <td>7:00 AM - 12:00 PM</td>
                </tr>
                <tr>
                  <th scope="row">Sunday</th>
                  <td>Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="coa-section coa-section--grey">
          <h4 className="coa-section__title">Use related services</h4>
          <a className="coa-list_link coa-list_link--box bg-white" href="/service/2">
            <span>Request a second, free recycling cart for your house</span>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </a>
          <a className="coa-list_link coa-list_link--box bg-white" href="/service/3">
            <span>Pick Up Free Mulch</span>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </a>
          <a className="coa-section__link" href="services/topicArea/1">See all services under Manage recycling, trash, compost, energy, and water</a>
        </div>

        <div className="coa-section">
          <FormFeedback />
          <a className="coa-section__link" href="#">Return to Top</a>
        </div>

      </div>
    );
  }

}

export default Service;
