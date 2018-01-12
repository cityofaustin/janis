import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import { cleanServiceLinks } from 'js/helpers/cleanData';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/services';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import FormFeedback from 'js/page_sections/FormFeedback';
import Service311 from 'js/page_sections/Service311';
import ListLink from 'js/modules/ListLink';
import allServicePagesQuery from 'js/queries/allServicePagesQuery';

class Services extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    axios
      .create({
        headers: { 'Accept-Language': this.props.lang }
      })
      .post(`${process.env.REACT_APP_CMS_ENDPOINT}/graphql/`, {
        query: allServicePagesQuery,
      })
      .then(res => {
        const data = this.cleanData(res);
        this.setState({ data: data });
      })
      .catch(err => console.log(err))
  }

  cleanData(res) {
    const data = get(res.data, 'data.allServicePages', {});
    data.services = cleanServiceLinks(data);

    return data;
  }

  render() {

    const { data } = this.state;

    const title = get(jsonFileData, "servicespage.title", null);
    const body = get(jsonFileData, "servicespage.body", null);
    const services311 = get(jsonFileData, "services311", null);
    const relatedlinks = get(data, 'services', null);

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

        <RelatedLinks
          relatedlinks={relatedlinks}
          sectionStyle="primary"
        />

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

export default Services;
