import React, { Component } from 'react';
import { get } from 'lodash';
// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/services';
import FormFeedback from 'components/FormFeedback';
import ListLink from 'components/ListLink';

const axios = require('axios');

class ServicesIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_CMS_ENDPOINT}/pages/?type=base.ServicePage`)
      .then(res => {
        this.setState({ data: res.data })
      })
      .catch(err => console.log(err))
  }

  render() {

    const title = get(jsonFileData, "title", "");
    const body = get(jsonFileData, "body", "");
    const services311 = get(jsonFileData, "snippets.services311", []);
    const { items: services = [] } = this.state.data

    return (
      <div>

        <div className="coa-page_hero">
          <div className="coa-page_hero__callout">
            <h2>{title}</h2>
          </div>
        </div>

        <div className="coa-page_body" dangerouslySetInnerHTML={{__html: body}} />

        <div className="coa-section">
          {
            services.map((service) =>
              <ListLink
                key={service.id}
                id={service.id}
                url={`/service/${service.id}`}
                text={service.title}
                isBoxType="true"
              />
            )
          }
        </div>

        <div className="coa-section coa-section--lightgrey">
          <FormFeedback />
          <a className="coa-section__link" href="#">Return to Top</a>
        </div>

        <div className="coa-section">
          <div className="coa-section__title">
            <h3>Request 311 Service or Call <a className="nowrap" href="tel:512-974-2000">512-974-2000</a></h3>
          </div>
          <p>311 is the city of Austin’s 24 hour information desk.</p>

        {
          services311.map((service) =>
            <ListLink
              key={service.id}
              id={service.id}
              url="#"
              text={service.title}
            />
          )
        }
          <a className="coa-section__link" href="#">See a Full List of 311 Services</a>
        </div>

      </div>
    );
  }

}

export default ServicesIndex;
