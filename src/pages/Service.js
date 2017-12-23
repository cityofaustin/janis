import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import { parse } from 'query-string';

import ContentItems from 'components/ContentItems';
import RelatedLinks from 'components/RelatedLinks';
import FormFeedback from 'components/FormFeedback';
import Contact from 'components/Contact';
import Service311 from 'components/Service311';

import jsonFileData from '__tmpdata/services';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }


  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      // Allow querystrings to set data, which is used in joplin for livepreview
      const query = parse(this.props.location.search);
      if (query.preview) {
        const data = JSON.parse(query.d);
        this.setState({ data: data });
        return;
      }
    }

    axios
      .get(`${process.env.REACT_APP_CMS_ENDPOINT}/pages/${this.props.match.params.id}?fields=content,extra_content,topic(text),locations(location(name,street,city,state,zip,country,hours)),contacts(contact(name,email,phone))`)
      .then(res => {
        this.setState({ data: res.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { data } = this.state;

    const topicId = get(data, "topic.id", null);
    const topicName = get(data, "topic.text", null);
    const title = get(data, "title", null);
    const steps = get(data, "content", null);
    const contentItems = get(data, "extra_content", null);
    const phone = get(data, "contacts[0].contact.phone", null);
    const email = get(data, "contacts[0].contact.email", null);
    const address = get(data, "locations[0].location", null);
    const hours = get(data, "locations[0].location.hours", null);
    const relatedlinks = get(jsonFileData, "servicesRelated", null);
    const services311 = get(jsonFileData, "services311", []);

    return (

      <div>

        <div className="wrapper">
          <div className="coa-main__hero--small"></div>
        </div>

        <div className="wrapper">
          <div className="row">
            <div className="coa-main__left col-xs-12 col-lg-8">

              <div className="coa-section">
                { topicId && ( <a className="coa-main__breadcrumb" href={`/services/topic/${topicId}`}>{topicName}</a> )}
                <h2 className="coa-main__title">{title}</h2>
                { steps && ( <div className="coa-main__steps coa-main__wysiwyg" dangerouslySetInnerHTML={{__html: steps}} /> )}
              </div>

              <ContentItems contentItems={contentItems} />

            </div>

            <div className="coa-main__right col-xs-12 col-lg-4">

              <Contact phone={phone} email={email} address={address} hours={hours} />

            </div>
          </div>
        </div>

        <RelatedLinks relatedlinks={relatedlinks} topicId={topicId} topicName={topicName} />

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

export default Service;
