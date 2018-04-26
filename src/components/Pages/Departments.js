import React from 'react';
import { withRouteData } from 'react-static';

import PageHeader from 'components/PageHeader';

const Departments = ({ allDepartments }) => {
  const links = allDepartments.edges.map(department => ({
    url: `/departments/${department.node.id}`,
    text: department.node.name,
  }));

  return (
    <div className="wrapper container-fluid">
      <PageHeader title={"All Departments"} />
    </div>
  )
}

export default withRouteData(Departments);
