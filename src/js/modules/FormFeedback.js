import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { postFeedback } from 'js/helpers/fetchData';
import { logEvent } from 'js/helpers/googleAnalytics';
import SectionHeaderSerif from 'js/modules/SectionHeaderSerif';

const i18nMessages = defineMessages({
  title: {
    id: 'FormFeedback.title',
    defaultMessage: 'How satisfied are you with this page?',
  }
});


class FormFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {intl} = this.props;

    return (
      <div className="coa-FormFeedback">
        <SectionHeaderSerif title={intl.formatMessage(i18nMessages.title)} />
      </div>
    );
  }
}

export default injectIntl(FormFeedback);
