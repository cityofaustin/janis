import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ExternalLink from 'components/ExternalLink';

const WorkInProgress = ({ isClipped }) => (
  isClipped
  ? <FormattedMessage
      id="misc.workInProgressClipped"
      values={{
        citySiteLink: (
          <ExternalLink to="http://austintexas.gov">
            austintexas.gov
          </ExternalLink>
        ),
      }}
      defaultMessage="Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit {citySiteLink}."
    />
  : <FormattedMessage
      id="misc.workInProgress"
      values={{
        citySiteLink: (
          <ExternalLink to="http://austintexas.gov">
            austintexas.gov
          </ExternalLink>
        ),
        projectsSiteLink: (
          <ExternalLink to="http://projects.austintexas.io/projects/austin-digital-services-discovery/about/what-we-are-doing/">
            projects.austintexas.io
          </ExternalLink>
        ),
      }}
      defaultMessage="Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit {citySiteLink}. Learn more about the new website at {projectsSiteLink}."
    />
)

export default WorkInProgress;
