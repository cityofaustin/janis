import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';

import ContentItems from 'components/ContentItems';
import RelatedLinks from 'components/RelatedLinks';
import FormFeedback from 'components/FormFeedback';
import Contact from 'components/Contact';

import s1 from '__tmpdata/service_1';
import s2 from '__tmpdata/service_2';
import s3 from '__tmpdata/service_3';
import s4 from '__tmpdata/service_4';

const servicedata = {
  6: s1,
  5: s2,
  7: s3,
  4: s4,
}

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_CMS_ENDPOINT}/pages/${this.props.match.params.id}?fields=content,extra_content,theme(text)`)
      .then(res => {
        this.setState({ data: res.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { data } = this.state;
    const jsonFileData = servicedata[this.props.match.params.id];

    const topicId = get(data, "theme.id", null);
    const topicName = get(data, "theme.text", null);
    const title = get(data, "title", null);
    const steps = get(data, "content", null);
    const contentItems = get(data, "extra_content", null);
    const phone = get(jsonFileData, "phone", null);
    const email = get(jsonFileData, "email", null);
    const address = get(jsonFileData, "address", null);
    const hours = get(jsonFileData, "hours", null);
    const relatedlinks = get(jsonFileData, "related", null);

    return (

      <div>

        <div className="coa-page_hero--small"></div>

        <div className="row">
          <div className="coa-page_left col-xs-12 col-lg-8">

            <div className="coa-section">
              { topicId && ( <a className="coa-page_breadcrumb" href={`/services/topic/${topicId}`}>{topicName}</a> )}
              <h2 className="coa-page_title">{title}</h2>
              { steps && ( <div className="coa-steps" dangerouslySetInnerHTML={{__html: steps}} /> )}
            </div>

            <ContentItems contentItems={contentItems} />

          </div>

          <div className="coa-page_right col-xs-12 col-lg-4">

            <Contact phone={phone} email={email} address={address} hours={hours} />

          </div>
        </div>

        <RelatedLinks relatedlinks={relatedlinks} topicId={topicId} topicName={topicName} />

        <div className="coa-section coa-section--lightgrey">
          <FormFeedback />
          <a className="coa-section__link" href="#">Return to Top</a>
        </div>

      </div>
    );
  }

}

export default Service;
