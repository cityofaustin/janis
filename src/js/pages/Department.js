import React from 'react';
import { get } from 'lodash';
import { cleanContacts } from 'js/helpers/cleanData';
import { withRouteData } from 'react-static';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
import SectionHeader from 'js/modules/SectionHeader';
import Hero from 'js/modules/Hero';
import ContactDetails from 'js/modules/ContactDetails';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import FormFeedback from 'js/page_sections/FormFeedback';
import Service311 from 'js/page_sections/Service311';

const Department = ({ department }) => {
  const title = get(department, "name", null);
  const body = get(department, "mission", null);
  const contacts = get(department, "contacts", null);
  const image = get(department, "image", null);
  const relatedLinks = get(jsonFileData, "departmentpage.projectsRelated", []);
  const services311 = get(jsonFileData, "services311", []);

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

            <ContactDetails contacts={contacts} />

          </div>
        </div>
      </div>

      <RelatedLinks
        relatedLinks={relatedLinks}
        sectionType="secondary"
        sectionLink={{url: "#", text: "Track all Resource Recovery projects"}}
        sectionTitle="Track Resource Recovery Projects"
        sectionText="Projects are short term, with a set budget, and defined goals. Projects can be specific to one department or a collaboration across multiple departments."
      />

      <div className="coa-section coa-section--lightgrey">
        <div className="wrapper">
          <FormFeedback />
          <a className="coa-section__link" href="#">Return to Top</a>
        </div>
      </div>

      <Service311 services311={services311} />

    </div>
  )
}

export default withRouteData(Department);
