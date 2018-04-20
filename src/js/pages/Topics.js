import React from 'react';
import { withRouteData } from 'react-static';

import PageHeader from 'js/modules/PageHeader';
import TileGroup from 'js/modules/TileGroup';

import { cleanLinks } from 'js/helpers/cleanData';

const Topics = ({ allTopics }) => {
  const links = cleanLinks(allTopics, '/topics');

  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={"All Topics"} />
      </div>
      <div className="wrapper">
        <TileGroup tiles={links} tag="topic" />
      </div>
    </div>
  )
}

export default withRouteData(Topics);
