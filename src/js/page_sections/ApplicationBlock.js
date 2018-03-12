import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import SectionTitle from 'js/modules/SectionTitle';
import Recollect from 'js/modules/Recollect';
import StaticMap from 'js/modules/StaticMap';

const i18nMessages = defineMessages({
  applicationBlockRecollectCalendar: {
    id: 'ApplicationBlock.recollect.calendar',
    defaultMessage: 'Use this form to look up your pickup schedule',
  },
  applicationBlockRecollectWizard: {
    id: 'ApplicationBlock.recollect.wizard',
    defaultMessage: 'Recycling Guidelines',
  },
});

const ApplicationBlock = ({ type, data, intl }) => {
  let app, title;
  switch(type) {
    case "collection_schedule_block":
      app = <Recollect name="calendar"/>;
      title = intl.formatMessage(i18nMessages.applicationBlockRecollectCalendar);
      break;
    case "what_do_i_do_with_block":
      app = <Recollect name="wizard"/>;
      title = intl.formatMessage(i18nMessages.applicationBlockRecollectWizard);
      break;
    case "map_block":
      app = <StaticMap title={data.description} location={data.location} />;
      title = data.description;
      break;
  }

  if (!app) return null;
  return (
    <div className="coa-ApplicationBlock">
      <SectionTitle title={title}/>
      {app}
    </div>
  );
}

export default injectIntl(ApplicationBlock);
