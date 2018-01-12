import React, { Component } from 'react';
import SectionTitle from 'js/modules/SectionTitle';
import ListLink from 'js/modules/ListLink';
import { Link } from 'react-router-dom';

class RelatedLinks extends Component {

  render() {

    const { relatedlinks, topicId, topicName } = this.props;

    return (relatedlinks) && (

      <div className="coa-section">
        <div className="wrapper">
          <SectionTitle title="Check out related city services" noBorder={true} />

          <div className="row">
          {
            relatedlinks.map((service) =>
              <div key={service.id} className="col-xs-12 col-md-6 col-lg-4">
              <ListLink
                id={service.id}
                url={`/service/${service.slug}`}
                text={service.title}
                isBoxType="true"
              />
              </div>
            )
          }
          </div>

          <Link className="coa-section__link" to={`/topic/${topicId}`}>
            See all services under {topicName}
          </Link>
        </div>
      </div>
    );
  }
}

export default RelatedLinks;
