import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/services';
import FormFeedback from 'components/layout/FormFeedback';
import Service311 from 'components/layout/Service311';
import ListLink from 'js/modules/ListLink';

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

    const title = get(jsonFileData, "servicepage.title", "");
    const body = get(jsonFileData, "servicepage.body", "");
    const services311 = get(jsonFileData, "services311", []);
    const { items: services = [] } = this.state.data

    return (
      <div>

        <div className="wrapper">
          <div className="coa-main__hero">
            <div className="coa-main__hero__callout">
              <h2>{title}</h2>
            </div>
          </div>

          <div className="coa-main__body" dangerouslySetInnerHTML={{__html: body}} />
        </div>

        <div className="coa-section">
          <div className="wrapper">
            <div className="row">
            {
              services.map((service) =>
                <div className="col-xs-12 col-md-6 col-lg-4">
                  <ListLink
                    key={service.id}
                    id={service.id}
                    url={`/service/${service.id}`}
                    text={service.title}
                    isBoxType={true}
                  />
                </div>
              )
            }
            </div>
          </div>
        </div>

        <div className="coa-section coa-section--lightgrey">
          <div className="wrapper">
            <FormFeedback />
            <a className="coa-section__link" href="#">Return to Top</a>
          </div>
        </div>

        <Service311 services311={services311} />

      </div>
    );
  }

}

export default ServicesIndex;
