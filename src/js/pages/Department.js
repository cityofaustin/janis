import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import { cleanContacts } from 'js/helpers/cleanData';
import { getRouteProps } from 'react-static';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/services';
import SectionTitle from 'js/modules/SectionTitle';
import Hero from 'js/modules/Hero';
import Contact from 'js/page_sections/Contact';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import FormFeedback from 'js/page_sections/FormFeedback';
import Service311 from 'js/page_sections/Service311';
import departmentPageQuery from 'js/queries/departmentPageQuery';

class Department extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // only refetch data when props have changed
    // this happens only when the route is updated

    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(nextProps.match.params.id);
    }
  }

  fetchData(id) {
    axios
      .post(`${process.env.REACT_APP_CMS_ENDPOINT}/graphql/`, {
        query: departmentPageQuery,
        variables: {
          id: id,
        }
      })
      .then(res => {
        const data = this.cleanData(res);
        this.setState({ data: data });
      })
      .catch(err => console.log(err))
  }

  cleanData(res) {
    const data = get(res.data, 'data.allDepartments.edges.0.node', {});
    data.contacts = cleanContacts(data.contacts);
    return data;
  }

  render() {
    console.log('props', this.props)
    const data = this.props.node;
    // const { data } = this.state;

    const title = get(data, "name", null);
    const body = get(data, "mission", null);
    const contacts = get(data, "contacts", null);
    const relatedlinks = get(jsonFileData, "projectsRelated", []);
    const services311 = get(jsonFileData, "services311", []);
    const { image } = data;

    return (
      <div>
        <Hero image={image} />

        <div className="wrapper">
          <div className="row">
            <div className="coa-main__left col-xs-12 col-lg-8">

              <div className="coa-section">
                <SectionTitle title={title} noBorder={true} />
              </div>

              <div className="coa-section">
                <SectionTitle title="Our Mission" noBorder={true} />
                <p>{body}</p>
              </div>

            </div>

            <div className="coa-main__right col-xs-12 col-lg-4">

              <Contact contacts={contacts} />

            </div>
          </div>
        </div>

        <RelatedLinks
          relatedlinks={relatedlinks}
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
    );
  }

}

export default getRouteProps(Department);
