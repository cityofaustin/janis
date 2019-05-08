import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  threeoneone as i18n1,
  callToAction as i18n2,
} from 'js/i18n/definitions';

import ExternalLink from 'components/ExternalLink';

const ThreeOneOneRequest = ({ intl }) => (
  <FormattedMessage
    id="threeoneone.contact311"
    values={{
      call311Link: (
        <a href="tel:512-974-2000" aria-label="3 1 1.">
          {intl.formatMessage(i18n1.call311)}
        </a>
      ),
      submit311Link: (
        <ExternalLink to="http://311.austintexas.gov/reports/list_services">
          {intl.formatMessage(i18n2.submitOnlineRequest)}
        </ExternalLink>
      ),
    }}
    defaultMessage="{call311Link} or {submit311Link}"
  />
);

ThreeOneOneRequest.propTypes = {};

export default injectIntl(ThreeOneOneRequest);
