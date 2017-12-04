import React, { Component } from 'react';
import { get } from 'lodash';
import data from '__tmpdata/services';
import FormFeedback from 'components/FormFeedback';
import ListLink from 'components/ListLink';
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
                id={service.id}
                url={`/service/${service.id}`}
                text={service.name}
                isBoxType="true"
              />
            )
          }
        </div>

        <div className="coa-section coa-section--grey">
          <FormFeedback />
          <a className="coa-section__link" href="#">Return to Top</a>
        </div>

        <div className="coa-section">
          <h4 className="coa-section__title">Request 311 Service or Call <a className="nowrap" href="tel:512-974-2000">512-974-2000</a></h4>
          <p className="usa-content">311 is the city of Austin’s 24 hour information desk.</p>

        {
          services311.map((service) =>
            <ListLink
              id={service.id}
              url="#"
              text={service.name}
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
