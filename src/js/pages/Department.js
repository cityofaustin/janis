import React from 'react';
import { get } from 'lodash';
import { cleanContacts } from 'js/helpers/cleanData';
import { withRouteData } from 'react-static';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
import SectionHeader from 'js/modules/SectionHeader';
import Hero from 'js/modules/Hero';
import ContactDetails from 'js/modules/ContactDetails';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';

const Department = ({ department }) => {
  const title = get(department, "name", null);
  const body = get(department, "mission", null);
  const contacts = get(department, "contacts", null);
  const image = get(department, "image", null);
  const relatedLinks = get(jsonFileData, "departmentpage.projectsRelated", []);
  const services311 = get(jsonFileData, "services311", []);

  //TODO: clean data where sourced
  const contact = cleanContacts(contacts)[0];

  return (
    <div>
      <Hero image={image} />

      <div className="wrapper">
        <div className="row">
          <div className="coa-main__left col-xs-12 col-lg-8">

            <div className="coa-section">
              <SectionHeader title={title}/>
            </div>

            <div className="coa-section">
              <SectionHeader title="Our Mission"/>
              <p>{body}</p>
            </div>

          </div>

          <div className="coa-main__right col-xs-12 col-lg-4">

          { contact && <ContactDetails contact={contact} /> }

          </div>
        </div>
      </div>

      <ThreeOneOne services311={services311} />

    </div>
  )
}

export default withRouteData(Department);
