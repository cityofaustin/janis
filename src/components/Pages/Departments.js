import React from 'react';
import { withRouteData } from 'react-static';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import FormFeedback from 'components/FormFeedback';

const Departments = ({ departments }) => (
  <div>
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader title={'All Departments'} />
    </div>
    <div className="wrapper container-fluid">
      <TileGroup tiles={departments} tag="department" />
    </div>
    <div className="wrapper wrapper--sm container-fluid">
      <FormFeedback />
    </div>
  </div>
);

export default withRouteData(Departments);
