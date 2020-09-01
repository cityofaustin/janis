import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { misc as i18n } from 'js/i18n/definitions';

import ExternalLink from 'components/ExternalLink';

const WorkInProgressBanner = ({ intl }) =>

  <FormattedMessage
    id="misc.workInProgressBanner"
    values={{
      workInProgressLink: (
        <Link to={`/${intl.locale}/a-new-website-for-the-city-of-austin/`}>
          {intl.formatMessage(i18n.workInProgressLinkText)}
        </Link>
      ),
      citySiteLink: (
        <ExternalLink noIcon={true} underline="underline" to="http://austintexas.gov">
          austintexas.gov
        </ExternalLink>
      ),
    }}
    defaultMessage="Alpha.austin.gov is a work in progress.\n{projectsSiteLink}"
  />


export default injectIntl(WorkInProgressBanner);
