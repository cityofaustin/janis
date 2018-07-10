import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import { request } from 'graphql-request';
import allServicePagesQuery from 'js/queries/allServicePagesQuery';
import allProcessesQuery from 'js/queries/allProcessesQuery';
import { cleanProcesses, cleanServices } from 'js/helpers/cleanData';
import Services from 'components/Pages/Services';
import Processes from 'components/Pages/Processes';

class CMSPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: <h1>LoAdInG...</h1>,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const {
      intl,
      match: {
        params: { revision_id, page_type },
      },
    } = this.props;

    const client = createGraphQLClientsByLang(intl.locale);
    switch (page_type) {
      case 'services':
        client
          .request(allServicePagesQuery)
          .then(({ allServicePages: allServices }) => {
            this.setState({
              content: <Services services={cleanServices(allServices)} />,
            });
          });
        break;
      case 'processes':
        client.request(allProcessesQuery).then(({ allProcesses }) => {
          this.setState({
            content: <Processes processes={cleanProcesses(allProcesses)} />,
          });
        });
        break;
      default:
        this.setState({
          content: <h1>OH NO</h1>,
        });
        break;
    }
  }

  render() {
    //TODO: make sub-routes for each page type
    return this.state.content;
  }
}

CMSPreview.propTypes = {};

export default injectIntl(CMSPreview);
