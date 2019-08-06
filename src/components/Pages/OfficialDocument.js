import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from 'moment-timezone';
import axios from 'axios';
import prettyBytes from 'pretty-bytes';

class OfficialDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfSize: null
    }
  }

  componentDidMount() {
    // Get the size of attached pdf link.
    // This is an optional UI addition. If the link is not a PDF, no need to throw an error.
    axios({
      method: 'HEAD',
      url: this.props.document.link,
      headers: {
        Origin: "alpha.austin.gov"
      }
    })
    .then(res => {
      if (res.headers["content-type"] === "application/pdf") {
        this.setState({pdfSize: prettyBytes(+res.headers["content-length"]).replace(" ", "")});
      }
    })
    .catch(error => null)
  }

  render() {
    const { id, date, title, authoringOffice, summary, name, link } = this.props.document;
    const { pdfSize } = this.state;

    let pdfSizeComponent = null;
    if (pdfSize) {
      pdfSizeComponent = <span className="coa-OfficialDocumentPage__pdf-size">(PDF {pdfSize})</span>
    }

    return (
      <div className="coa-OfficialDocumentPage__container">
        <div className="coa-OfficialDocumentPage__date">
          {moment(date, "YYYY-MM-DD").format('LL')}
        </div>
        <h2 className="coa-OfficialDocumentPage__title">{title}</h2>
        <p>{summary}</p>
        <div className="coa-OfficialDocumentPage__small-heading-container">
          <span className="coa-OfficialDocumentPage__small-heading">Author:</span> {authoringOffice}
        </div>
        <div className="coa-OfficialDocumentPage__small-heading-container">
          <span className="coa-OfficialDocumentPage__small-heading">Document:</span> <a href={link}>{name}</a> {pdfSizeComponent}
        </div>
      </div>
    )
  }
};

OfficialDocument.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authoringOffice: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })
}

export default injectIntl(OfficialDocument);
