import React, { Component } from 'react';
import { get } from 'lodash';
import data from '__tmpdata/services';
import FormFeedback from 'components/FormFeedback';
var axios = require('axios');

class ServicesIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/v2/pages/?format=json&type=base.ServicePage&fields=content,extra_content,tags')
      .then(res => {
        this.setState({
          title: res.data.items[0].title,
          body: res.data.items[0].content
        })
      })
      .catch(err => console.log(err))
  }

  render() {

    const title = get(data, "title", "");
    const body = get(data, "body", "");
    const services = get(data, "snippets.services", []);
    const services311 = get(data, "snippets.services311", []);

    return (
      <div>

        <div className="coa-hero">
          <div className="coa-hero__callout">
            <h1>{title}</h1>
          </div>
        </div>

        <div className="coa-body" dangerouslySetInnerHTML={{__html: body}} />

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
          <FormFeedback />
          <a href="#">Return to Top</a>
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
          <a href="#">See a Full List of 311 Services</a>
        </div>

      </div>
    );
  }

}

export default ServicesIndex;
