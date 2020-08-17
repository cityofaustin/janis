import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { misc as i18n } from 'js/i18n/definitions';

import ExternalLink from 'components/ExternalLink';

const WorkInProgress = ({ isClipped, intl }) =>
  isClipped ? (
    <FormattedMessage
      id="misc.workInProgressClipped"
      values={{
        citySiteLink: (
          <ExternalLink to="http://austintexas.gov">
            austintexas.gov
          </ExternalLink>
        ),
        alphaSiteLink: (
          <a className="coa-Footer__link" href="/">
            Alpha.austin.gov
          </a>
        ),
        projectsSiteLink: (
          <a href={`/${intl.locale}/feedback/`}>
            {intl.formatMessage(i18n.projectsSiteLinkText)}
          </a>
        ),
      }}
      defaultMessage="Alpha.austin.gov is a work in progress.\n{projectsSiteLink}"
    />
  ) : (
    <FormattedMessage
      id="misc.workInProgress"
      values={{
        citySiteLink: (
          <ExternalLink
            className="coa-Footer__link"
            to="http://austintexas.gov"
          >
            austintexas.gov
          </ExternalLink>
        ),
        projectsSiteLink: (
          <ExternalLink to="https://projects.austintexas.io/projects/austin-digital-services-discovery/">
            projects.austintexas.io
          </ExternalLink>
        ),
      }}
      defaultMessage="Alpha.austin.gov is a work in progress.\n{projectsSiteLink}"
    />
  );

WorkInProgress.propTypes = {
  isClipped: PropTypes.bool,
};

export default injectIntl(WorkInProgress);
