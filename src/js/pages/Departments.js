import React from 'react';
import { getRouteProps } from 'react-static';

import Hero from 'js/modules/Hero';
import RelatedLinks from 'js/page_sections/RelatedLinks';

const Departments = ({ allDepartments }) => {
  const links = allDepartments.edges.map(department => ({
    url: `/departments/${department.node.id}`,
    text: department.node.name,
  }));

  return (
    <div className="wrapper">
      <Hero callout={"All Departments"} />
      <RelatedLinks
        relatedlinks={links}
        sectionStyle="primary"
      />
    </div>
  )
}

export default getRouteProps(Departments);
