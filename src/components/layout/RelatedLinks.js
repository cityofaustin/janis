import React, { Component } from 'react';
import ListLink from 'components/modules/ListLink';

class RelatedLinks extends Component {

  render() {

    const { relatedlinks, topicId, topicName } = this.props;

    return (relatedlinks) && (

      <div className="coa-section">
        <div className="wrapper">
          <div className="coa-section__title">
            <h3>Check out related city services</h3>
          </div>

          <div className="row">
          {
            relatedlinks.map((service) =>
              <div key={service.id} className="col-xs-12 col-md-6 col-lg-4">
              <ListLink
                id={service.id}
                url={`/service/${service.id}`}
                text={service.title}
                isBoxType="true"
              />
              </div>
            )
          }
          </div>

          <a className="coa-section__link" href={`/services/topic/${topicId}`}>See all services under {topicName}</a>
        </div>
      </div>
    );
  }
}

export default RelatedLinks;
