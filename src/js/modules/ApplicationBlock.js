import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import Recollect from 'js/modules/Recollect';
import StaticMap from 'js/modules/StaticMap';

const i18nMessages = defineMessages({
  applicationBlockRecollectCalendar: {
    id: 'ApplicationBlock.recollect.calendar',
    defaultMessage: 'Type your street address in the box below',
  },
  applicationBlockRecollectWizard: {
    id: 'ApplicationBlock.recollect.wizard',
    defaultMessage: 'Check the "What do I do with" tool below to find out what items are accepted.',
  },
});

const ApplicationBlock = ({ content, intl }) => {

  const { type, value } = content;
  let app, title, id;
  switch(type) {
    case "collection_schedule_block":
      app = <Recollect options={{name:"calendar"}} />;
      title = intl.formatMessage(i18nMessages.applicationBlockRecollectCalendar);
      id = "HashLink-Recollect";
      break;
    case "what_do_i_do_with_block":
      app = <Recollect options={{name:"wizard"}}/>;
      title = intl.formatMessage(i18nMessages.applicationBlockRecollectWizard);
      id = "HashLink-Recollect";
      break;
    case "recollect_block":
      app = <Recollect options={{page:"tabbed_widget", name:"wizard"}}/>;
      title = intl.formatMessage(i18nMessages.applicationBlockRecollectWizard);
      id = "HashLink-Recollect";
      break;
    case "map_block":
      app = <StaticMap title={value.description} location={value.location} />;
      title = value.description;
      id = `HashLink-Map-${content.id}`;
      break;
  }

  if (!app) return null;
  return (
    <div id={id} className="coa-ApplicationBlock">
      <h2 className="coa-ApplicationBlock__title">{title}</h2>
      {app}
    </div>
  );
}

export default injectIntl(ApplicationBlock);
