import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

const HowYouKnowMenu = ({ open, intl }) => (
  <div className={classNames('coa-HowYouKnowMenu', {'coa-HowYouKnowMenu--is-open': open})}>
    BLARG
    {open ? "yes" : "no"}
  </div>
);

HowYouKnowMenu.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default injectIntl(HowYouKnowMenu);
