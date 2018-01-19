import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import { cleanServiceLinks } from 'js/helpers/cleanData';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/services';
import Hero from 'js/modules/Hero';
import RelatedLinks from 'js/page_sections/RelatedLinks';
import FormFeedback from 'js/page_sections/FormFeedback';
import Service311 from 'js/page_sections/Service311';
import topicPageQuery from 'js/queries/topicPageQuery';

class Topic extends Component {

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
        query: topicPageQuery,
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
    const data = get(res.data, 'data.allTopics.edges[0].node', {});
    data.services = cleanServiceLinks(data.services);
    return data;
  }

  render() {

    const { data } = this.state;
    const title = get(data, "text", null);
    const body = get(data, "description", null);
    const relatedlinks = get(data, "services", null);
    const services311 = get(jsonFileData, "services311", null);

    return (
      <div>

        <div className="wrapper">
          <Hero callout={title} />
          <div className="coa-main__body" dangerouslySetInnerHTML={{__html: body}} />
        </div>

        <RelatedLinks
          relatedlinks={relatedlinks}
          sectionStyle="primary"
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

export default Topic;
