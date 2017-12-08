import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';

import FormFeedback from 'components/FormFeedback';
import ListLink from 'components/ListLink';
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
    const related = get(jsonFileData, "related", null);

    return (
      <div>
        <div className="coa-page_hero--small"></div>
        <div className="coa-section">
          { topicId && (
            <a className="coa-page_breadcrumb" href={`/services/topic/${topicId}`}>{topicName}</a>
          )}
          <h2 className="coa-page_title">{title}</h2>
          { steps && (
              <div className="coa-steps" dangerouslySetInnerHTML={{__html: steps}} />
          )}
        </div>

      {
        contentItems && contentItems.map((content) => {
          if (content.type === 'application_block') {
            return (
              <div className="coa-section">
                <h4>{content.value.description}</h4>
                INSERT {content.type} app HERE
                { content.value.url && <div dangerouslySetInnerHTML={{__html: content.value.url}} /> }
              </div>
            );
          } else if (content.type === 'content') {
            return (
              <div className="coa-section" dangerouslySetInnerHTML={{__html: content.value}} />
            )
          }
        })
      }

      <Contact
        phone={phone}
        email={email}
        address={address}
        hours={hours}
      />

      { related && (
        <div className="coa-section coa-section--grey">
          <div className="coa-section__title">
            <h3>Use related services</h3>
          </div>

          <div className="row">
          {
            related.map((service) =>
              <div className="col-xs-12 col-md-6 col-lg-4">
              <ListLink
                id={service.id}
                url={`/service/${service.id}`}
                text={service.name}
                isBoxType="true"
              />
              </div>
            )
          }
          </div>

          <a className="coa-section__link" href={`/services/topic/${topicId}`}>See all services under {topicName}</a>
        </div>
      )}

        <div className="coa-section coa-section--lightgrey">
          <FormFeedback />
          <a className="coa-section__link" href="#">Return to Top</a>
        </div>

      </div>
    );
  }

}

export default Service;
