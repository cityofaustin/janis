import React from 'react';
import { get } from 'lodash';
import { cleanContacts } from 'js/helpers/cleanData';
import { withRouteData } from 'react-static';

import SectionHeader from 'components/SectionHeader';
import PageHeader from 'components/PageHeader';
import ContactDetails from 'components/Contact/ContactDetails';
import FormFeedback from 'components/FormFeedback';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';

const Department = ({ department }) => {
  const title = get(department, 'name', null);
  const body = get(department, 'mission', null);
  const contacts = get(department, 'contacts', null);
  const image = get(department, 'image', null);
  const relatedLinks = get(jsonFileData, 'departmentpage.projectsRelated', []);

  //TODO: clean data where sourced
  const contact = cleanContacts(contacts)[0];

  return (
    <div>
      <PageHeader image={image} />

      <div className="wrapper wrapper--sm container-fluid">
        <SectionHeader hasHighlight={true}>{title}</SectionHeader>
        <SectionHeader hasHighlight={true}>Our Mission</SectionHeader>
        <p>{body}</p>
        {contact && <ContactDetails contact={contact} />}
        <FormFeedback />
      </div>
    </div>
  );
};

export default withRouteData(Department);
