import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
class CMSPreview extends Component {
  constructor(props) {
    super(props);

    const {
      intl,
      match: {
        params: { revision_id, page_type },
      },
    } = props;

    this.state = {
      content: null,
      component: null,
      revision_id: revision_id,
      page_type: page_type,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    //fetch data based on revision id and page type
    // switch (this.state.page_type) {
    //   case 'services':
    //     toRender = `<h1>ServicePage - ${this.state.content.title}</h1>`;
    //     break;
    //   case 'processes':
    //     toRender = `<h1>ProcessPage - ${this.state.content.title}</h1>`;
    //     break;
    //   default:
    //     toRender = `<h1>OH NO - ${this.state.content.title}</h1>`;
    //     break;
    // }
    this.setState({
      content: {
        title: `${this.state.page_type} - ${this.state.revision_id}`,
      },
    });
  }

  render() {
    if (!this.state.content) return null;
    const { title } = this.state.content;
    return `<h1>${title}</h1>`;
  }
}

CMSPreview.propTypes = {};

export default injectIntl(CMSPreview);
