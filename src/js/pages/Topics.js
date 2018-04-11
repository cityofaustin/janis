import React from 'react';
import { withRouteData } from 'react-static';

import PageHeader from 'js/modules/PageHeader';
import TileGroup from 'js/modules/TileGroup';

const Topics = ({ allTopics }) => {
  const links = allTopics.edges.map(topic => ({
    url: `/topics/${topic.node.slug}`,
    text: topic.node.text,
  }));

  return (
    <div className="wrapper">
      <PageHeader title={"All Topics"} />
      <TileGroup tiles={links} />
    </div>
  )
}

export default withRouteData(Topics);
