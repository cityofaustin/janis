import React from 'react';
import { withRouteData } from 'react-static';
import { get } from 'lodash';

import PageHeader from 'components/PageHeader/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import ThreeOneOne from 'components/PageSections/ThreeOneOne/ThreeOneOne';

import { cleanLinks } from 'js/helpers/cleanData';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
const services311 = get(jsonFileData, "services311", null);

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
      <ThreeOneOne services311={services311} />
    </div>
  )
}

export default withRouteData(Themes);
