import React, { Component } from 'react';
import { get } from 'lodash';
import axios from 'axios';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/services';
import FormFeedback from 'js/page_sections/FormFeedback';
import Service311 from 'js/page_sections/Service311';
import ListLink from 'js/modules/ListLink';
import topicPageQuery from 'js/queries/topicPageQuery';

class Topic extends Component {

  constructor(props) {
    super(props);
    this.isLoaded = false;
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

  shouldComponentUpdate(nextProps, nextState) {
    // only rerender component when state has changed
    // this happens only when data is refetched
    if (this.isLoaded) {
      this.isLoaded = false;
      return true;
    }

    return false;
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
        const data = get(res.data.data.allTopics, 'edges.0.node', null);
        this.isLoaded = true;
        this.setState({ data: data });
      })
      .catch(err => console.log(err))
  }

  render() {
    const title = get(this.state.data, "text", "");
    const body = get(this.state.data, "description", "");
    const services = get(this.state.data, "services.edges", []);
    const services311 = get(jsonFileData, "services311", []);

    return (
      <div>

        <div className="wrapper">
          <div className="coa-main__hero">
            <div className="coa-main__hero__callout">
              <h2>{title}</h2>
            </div>
          </div>

          <div className="coa-main__body" dangerouslySetInnerHTML={{__html: body}} />
        </div>

        <div className="coa-section">
          <div className="wrapper">
            <div className="row">
            {
              services.map(({ node: service }) =>
                <div key={service.id} className="col-xs-12 col-md-6 col-lg-4">
                  <ListLink
                    id={service.id}
                    url={`/service/${service.slug}`}
                    text={service.title}
                    isBoxType={true}
                  />
                </div>
              )
            }
            </div>
          </div>
        </div>

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
