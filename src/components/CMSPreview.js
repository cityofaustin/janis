import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
const CMSPreview = ({
  intl,
  match: {
    params: { revision_id, page_type },
  },
}) => {
  var toRender;
  switch (page_type) {
    case 'services':
      toRender = `<h1>Service - ${revision_id}</h1>`;
      break;
    case 'processes':
      toRender = `<h1>Process - ${revision_id}</h1>`;
      break;
    default:
      toRender = `<h1>OH NO - ${revision_id}</h1>`;
      break;
  }
  return toRender;
};

CMSPreview.propTypes = {};

export default injectIntl(CMSPreview);
