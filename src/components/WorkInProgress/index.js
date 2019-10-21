import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-static';
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
          <Link className="coa-Footer__link" to="/">
            Alpha.austin.gov
          </Link>
        ),
        projectsSiteLink: (
          <Link to={`/${intl.locale}/feedback/`}>
            {intl.formatMessage(i18n.projectsSiteLinkText)}
          </Link>
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
