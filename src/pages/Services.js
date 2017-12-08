import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/services';
import FormFeedback from 'components/FormFeedback';
import ListLink from 'components/ListLink';


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
          <div className="row">
          {
            services.map((service) =>
              <div className="col-xs-12 col-md-6 col-lg-4">
                <ListLink
                  key={service.id}
                  id={service.id}
                  url={`/service/${service.id}`}
                  text={service.title}
                  isBoxType="true"
                />
              </div>
            )
          }
          </div>
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

          <div className="row">
          {
            services311.map((service) =>
              <div className="col-xs-12 col-lg-4">
                <ListLink
                  key={service.id}
                  id={service.id}
                  url="#"
                  text={service.title}
                />
              </div>
            )
          }
          </div>

          <a className="coa-section__link" href="#">See a Full List of 311 Services</a>
        </div>

      </div>
    );
  }

}

export default ServicesIndex;
