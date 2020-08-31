import React from 'react';
import { injectIntl } from 'react-intl';
import CitySeal from 'components/SVGs/CitySeal.js';
import LoveChicken from 'components/SVGs/LoveChicken';
import CoaSeal from '../../SVGs/CoaSeal';
import { misc as i18n2 } from 'js/i18n/definitions';

const MenuInfo = ({ handleToggleFullSiteMenu, intl }) => (
  <div className="coa-MenuInfo">
    <div className="wrapper container-fluid">
      <div className="coa-MenuInfo__container">
        <div className="coa-MenuInfo__disclaimer">
          <span>{intl.formatMessage(i18n2.workInProgressTiny)}</span>
        </div>
        <div className="coa-MenuInfo__resource">
          <div className="coa-MenuInfo__svg">
            <CoaSeal />
          </div>
          <a href="https://austintexas.gov/" className="coa-MenuInfo__link">
            {intl.formatMessage(i18n2.currentSite)}
          </a>
        </div>
        <div className="coa-MenuInfo__resource">
          <div className="coa-MenuInfo__svg">
            <i className="material-icons">feedback</i>
          </div>
          <a
            href={`/${intl.locale}/feedback/`}
            className="coa-MenuInfo__link"
            onClick={handleToggleFullSiteMenu}
          >
            {intl.formatMessage(i18n2.giveUserFeedback)}
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default injectIntl(MenuInfo);
