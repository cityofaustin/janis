import React from 'react';
import { withRouteData } from 'react-static';

import Hero from 'js/modules/Hero';
import RelatedLinks from 'js/page_sections/RelatedLinks';



const Topics = ({ allTopics }) => {
  const links = allTopics.edges.map(topic => ({
    url: `/topics/${topic.node.id}`,
    text: topic.node.text,
  }));

  return (
    <div className="wrapper">
      <Hero callout={"All Topics"} />
      <RelatedLinks
        relatedLinks={links}
        sectionStyle="primary"
      />
    </div>
  )
}

export default withRouteData(Topics);
