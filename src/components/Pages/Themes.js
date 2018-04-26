import React from 'react';
import { withRouteData } from 'react-static';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import { cleanLinks } from 'js/helpers/cleanData';

const Themes = ({ allThemes }) => {
  const links = cleanLinks(allThemes, '/themes');

  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={"All Themes"} />
      </div>
      <div className="wrapper">
        <TileGroup tiles={links} tag="theme"/>
      </div>
    </div>
  )
}

export default withRouteData(Themes);
