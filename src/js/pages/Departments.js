import React from 'react';
import { withRouteData } from 'react-static';

import Hero from 'js/modules/Hero';

const Departments = ({ allDepartments }) => {
  const links = allDepartments.edges.map(department => ({
    url: `/departments/${department.node.id}`,
    text: department.node.name,
  }));

  return (
    <div className="wrapper">
      <Hero callout={"All Departments"} />
    </div>
  )
}

export default withRouteData(Departments);
