import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { howYouKnowMenu as i18n } from 'js/i18n/definitions';

const PendingTranslation = ({ open, intl }) => (
  <div
    className={classNames('coa-PendingTranslation', {
      'coa-PendingTranslation--is-open': open,
    })}
  >
    <p>Translations for this website are a work in progress.</p>
    <p className='coa-PendingTranslation--link'>If you would like to help us improve, please sign-up to participate in user research. 
      <Link to={'/es/feedback/'}>
        https://alpha.austin.gov/es/feedback/
      </Link></p>
  </div>
);

PendingTranslation.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default injectIntl(PendingTranslation);
