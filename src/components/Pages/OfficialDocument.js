import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from 'moment-timezone';

const OfficialDocument = ({ document: { id, date, title, authoringOffice, summary, name, link, pdfSize }, intl }) => {
  // If the link is a PDF with a pdfSize, then include it.
  const pdfComponent = (!!pdfSize) ?
    <span className="coa-OfficialDocumentPage__pdf-size">(PDF {pdfSize})</span> :
    null

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
        <span className="coa-OfficialDocumentPage__small-heading">Document:</span> <a href={link}>{name}</a> {pdfComponent}
      </div>
    </div>
  );
}

OfficialDocument.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authoringOffice: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    pdfSize: PropTypes.string,
  }),
}

export default injectIntl(OfficialDocument);
