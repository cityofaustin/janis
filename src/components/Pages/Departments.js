import React from 'react';
import { withRouteData } from 'react-static';

import PageHeader from 'components/PageHeader';
import FormFeedback from 'components/FormFeedback';

const Departments = ({ allDepartments }) => {
  const links = allDepartments.edges.map(department => ({
    url: `/departments/${department.node.id}`,
    text: department.node.name,
  }));

  return (
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader title={'All Departments'} />
      <FormFeedback />
    </div>
  );
};

export default withRouteData(Departments);
