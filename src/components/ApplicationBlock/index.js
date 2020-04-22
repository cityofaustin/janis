import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { callToAction as i18n } from 'js/i18n/definitions';

import Recollect from 'components/Recollect';
import Trashy from 'components/Trashy';
import ContactMap from 'components/Contact/ContactMap';
import SectionHeader from 'components/SectionHeader';

const ApplicationBlock = ({ content: { id, type, value }, intl }) => {
  let app, title, pageanchorId;
  switch (type) {
    case 'collection_schedule_block':
      app = <Trashy />;
      title = intl.formatMessage(i18n.enterAddress);
      pageanchorId = 'HashLink-Recollect';
      break;
    case 'what_do_i_do_with_block':
      app = <Recollect options={{ name: 'wizard' }} />;
      title = intl.formatMessage(i18n.whatDoIDoWith);
      pageanchorId = 'HashLink-Recollect';
      break;
    case 'recollect_block':
      app = <Recollect options={{ page: 'tabbed_widget', name: 'wizard' }} />;
      title = intl.formatMessage(i18n.whatDoIDoWith);
      pageanchorId = 'HashLink-Recollect';
      break;
  }

  if (!app) return null;
  return (
    <div id={pageanchorId} className="coa-ApplicationBlock">
      <SectionHeader>{title}</SectionHeader>
      {app}
    </div>
  );
};

ApplicationBlock.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.object,
  }).isRequired,
};

export default injectIntl(ApplicationBlock);
