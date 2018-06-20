import React from 'react';
import { get } from 'lodash';
import { withRouteData } from 'react-static';

import SectionHeader from 'components/SectionHeader';
import ContactDetails from 'components/Contact/ContactDetails';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';

const Department = ({ department: { name, mission, contacts } }) => {
  const relatedLinks = get(jsonFileData, 'departmentpage.projectsRelated', []);

  return (
    <div className="wrapper wrapper--sm container-fluid">
      <SectionHeader hasHighlight={true}>{name}</SectionHeader>
      <p>{mission}</p>
      {!!contacts.length && <ContactDetails contact={contacts[0]} />}
    </div>
  );
};

export default withRouteData(Department);
