import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

const HowYouKnowMenu = ({ open, intl }) => (
  <div className={classNames('coa-HowYouKnowMenu', {'coa-HowYouKnowMenu--is-open': open})}>
    <div className="container-fluid wrapper">
      <div className="coa-HowYouKnowMenu__info-blocks">
        <div className="coa-HowYouKnowMenu__info-block">
          <i class="material-icons coa-HowYouKnowMenu__icon">domain</i>
          <div className="coa-HowYouKnowMenu__info-block-text">
            <div className="coa-HowYouKnowMenu__info-block-header">The .gov means it’s official.</div>
            <div>Government websites often end in .gov. Before sharing sensitive information, make sure you’re on a federal government site.</div>
          </div>
        </div>
        <div className="coa-HowYouKnowMenu__info-block">
          <i class="material-icons coa-HowYouKnowMenu__icon">lock</i>
          <div className="coa-HowYouKnowMenu__info-block-text">
            <div className="coa-HowYouKnowMenu__info-block-header">The site is secure.</div>
            <div>The https:// ensures that you are connecting to the official website and that any information you provide is encrypted and transmitted securely.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

HowYouKnowMenu.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default injectIntl(HowYouKnowMenu);
