import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

import { officialdocuments as i18n } from 'js/i18n/definitions';

const OfficialDocumentEntry = ({ 
  page: {
    id,
    date,
    title,
    authoringOffice,
    summary,
    name,
    link,
    pdfSize,
    slug,
    departments
  },
  intl
}) => {

  // If the link is a PDF with a pdfSize, then include it.
  const pdfComponent = (!!pdfSize) ?
    <span className="coa-OfficialDocumentPage__pdf-size">(PDF {pdfSize})</span> :
    null

  const entryUrl = (departments, slug) => (
    (!!departments && !!departments.length) ?
      `/${departments[0].slug}/${slug}`
      : '/'
  )

  // set the locale configuration for moment. Sets the locale for this component only
  moment.locale(intl.locale);
  return (
    <div className="coa-OfficialDocumentPage__container">
      <div className="coa-OfficialDocumentPage__date">
        {moment(date, "YYYY-MM-DD").format('LL')}
      </div>
      <Link to={entryUrl(departments, slug)}>
        <h2 className="coa-OfficialDocumentPage__title">{title}</h2>
      </Link>;
      <p>{summary}</p>
      <div className="coa-OfficialDocumentPage__small-heading-container">
        <span className="coa-OfficialDocumentPage__small-heading">{intl.formatMessage(i18n.author)}:</span> {authoringOffice}
      </div>
      <div className="coa-OfficialDocumentPage__small-heading-container">
        <span className="coa-OfficialDocumentPage__small-heading">{intl.formatMessage(i18n.document)}:</span> <a href={link}>{name}</a> {pdfComponent}
      </div>
    </div>
  );
}

OfficialDocumentEntry.propTypes = {
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

export default injectIntl(OfficialDocumentEntry);
