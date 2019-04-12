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
          <ExternalLink to="https://projects.austintexas.io/projects/austin-digital-services-discovery/">
            {intl.formatMessage(i18n.projectsSiteLinkText)}
          </ExternalLink>
        ),
      }}
      defaultMessage="{alphaSiteLink} is a work in progress. Learn more on our {projectsSiteLink}"
    />
  ) : (
    <FormattedMessage
      id="misc.workInProgress"
      values={{
        citySiteLink: (
          <ExternalLink className="coa-Footer__link" to="http://austintexas.gov">
            austintexas.gov
          </ExternalLink>
        ),
        projectsSiteLink: (
          <ExternalLink to="https://projects.austintexas.io/projects/austin-digital-services-discovery/">
            projects.austintexas.io
          </ExternalLink>
        ),
      }}
      defaultMessage="Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit {citySiteLink}. Learn more about the new website at {projectsSiteLink}."
    />
  );

WorkInProgress.propTypes = {
  isClipped: PropTypes.bool,
};

export default injectIntl(WorkInProgress);
