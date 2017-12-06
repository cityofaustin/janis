import React, { Component } from 'react';
import { get } from 'lodash';
import FormFeedback from 'components/FormFeedback';
import ListLink from 'components/ListLink';
import Contact from 'components/Contact';

import s1 from '__tmpdata/service_1';
import s2 from '__tmpdata/service_2';
import s3 from '__tmpdata/service_3';

const servicedata = {
  1: s1,
  2: s2,
  3: s3
}

class Service extends Component {

  render() {

    const data = servicedata[this.props.match.params.id];

    const topicId = get(data, "topic.id", null);
    const topicName = get(data, "topic.name", null);
    const title = get(data, "title", null);
    const steps = get(data, "steps", null);
    const body = get(data, "body", null);
    const phone = get(data, "phone", null);
    const email = get(data, "email", null);
    const address = get(data, "address", null);
    const hours = get(data, "hours", null);
    const apps = get(data, "apps", null);
    const related = get(data, "related", null);

    return (
      <div>
        <div className="coa-page_hero--small"></div>
        <div className="coa-section">
          <a className="coa-page_breadcrumb" href={`/services/topic/${topicId}`}>{topicName}</a>
          <h2 className="coa-page_title">{title}</h2>
          { steps && (
              <div className="coa-steps" dangerouslySetInnerHTML={{__html: steps}} />
          )}
        </div>

      { apps && (

        apps.map((app) => {
          return (
            <div className="coa-section">
              <h4>{app.title}</h4>
              INSERT {app.type} app HERE
              { app.body && <div dangerouslySetInnerHTML={{__html: app.body}} /> }
            </div>
          );
        })
      )}

      { body && (
        <div className="coa-section" dangerouslySetInnerHTML={{__html: body}} />
      )}

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
          {
            related.map((service) =>
              <ListLink
                id={service.id}
                url={`/service/${service.id}`}
                text={service.name}
                isBoxType="true"
              />
            )
          }
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
