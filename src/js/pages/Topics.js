import React from 'react';
import { withRouteData } from 'react-static';

import Hero from 'js/modules/Hero';
import TileGroup from 'js/modules/TileGroup';

const Topics = ({ allTopics }) => {
  const links = allTopics.edges.map(topic => ({
    url: `/topics/${topic.node.id}`,
    text: topic.node.text,
  }));

  return (
    <div className="wrapper">
      <Hero callout={"All Topics"} />
      <TileGroup tiles={links} />
    </div>
  )
}

export default withRouteData(Topics);
