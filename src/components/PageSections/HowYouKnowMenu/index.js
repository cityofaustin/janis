import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import GovSVG from 'components/SVGs/Gov';
import GovSite from 'components/PageSections/Header/GovSite';

import { howYouKnowMenu as i18n } from 'js/i18n/definitions';

const HowYouKnowMenu = ({ open, intl }) => (
  <div
    className={classNames('coa-HowYouKnowMenu', {
      'coa-HowYouKnowMenu--is-open': open,
    })}
  >
    <div className="container-fluid wrapper">
      <div className="coa-HowYouKnowMenu__info-blocks">
        <div className="coa-HowYouKnowMenu__info-block">
          <GovSVG fill="white" />
          <div className="coa-HowYouKnowMenu__info-block-text">
            <div className="coa-HowYouKnowMenu__info-block-header">
              {intl.formatMessage(i18n.dotGovHeader)}
            </div>
            <div>{intl.formatMessage(i18n.dotGovText)}</div>
          </div>
        </div>
        <div className="coa-HowYouKnowMenu__info-block">
          <i className="material-icons coa-HowYouKnowMenu__icon">lock</i>
          <div className="coa-HowYouKnowMenu__info-block-text">
            <div className="coa-HowYouKnowMenu__info-block-header">
              {intl.formatMessage(i18n.httpsHeader)}
            </div>
            <div>{intl.formatMessage(i18n.httpsText)}</div>
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
