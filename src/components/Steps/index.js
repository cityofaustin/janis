import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { misc as i18n } from 'js/i18n/definitions';
import SectionHeader from 'components/SectionHeader';

const Steps = ({ steps, intl }) => (
  <div className="coa-Steps">
    <SectionHeader>{intl.formatMessage(i18n.steps)}</SectionHeader>
    <div className="coa-Steps__list">
      <ul>
        {steps.map(step => (
          <li>
            <p dangerouslySetInnerHTML={{ __html: step }} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
};

export default injectIntl(Steps);
