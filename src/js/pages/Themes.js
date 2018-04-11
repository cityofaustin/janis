import React from 'react';
import { withRouteData } from 'react-static';

import PageHeader from 'js/modules/PageHeader';
import TileGroup from 'js/modules/TileGroup';

const Themes = ({ allThemes }) => {
  const links = allThemes.edges.map(theme => ({
    url: `/themes/${theme.node.slug}`,
    text: theme.node.text,
  }));

  return (
    <div className="wrapper container-fluid">
      <PageHeader title={"All Themes"} />
      <TileGroup tiles={links} />
    </div>
  )
}

export default withRouteData(Themes);
