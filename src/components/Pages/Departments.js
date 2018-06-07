import React from 'react';
import { withRouteData } from 'react-static';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';

const Departments = ({ departments }) => (
  <div>
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader title={'All Departments'} />
    </div>
    <div className="wrapper container-fluid">
      <TileGroup tiles={departments} tag="department" />
    </div>
  </div>
);

export default withRouteData(Departments);
