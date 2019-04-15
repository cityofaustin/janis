import React from 'react';
import { injectIntl } from 'react-intl';
import CitySeal from 'components/SVGs/CitySeal.js';
import LoveChicken from 'components/SVGs/LoveChicken';
import CoaSeal from '../../SVGs/CoaSeal';

const MenuInfo = () => (
  <div className="coa-MenuInfo">
    <div className="wrapper container-fluid">
      <div className="coa-MenuInfo__container">
        <div className="coa-MenuInfo__disclaimer">
          <span>alpha.austin.gov is a work in progress.</span>
        </div>
        <div className="coa-MenuInfo__resource">
          <div className="coa-MenuInfo__svg">
            <CoaSeal />
          </div>
          <a className="coa-MenuInfo__link">
            Visit austintexas.gov for the current city website.
          </a>
        </div>
        <div className="coa-MenuInfo__resource">
          <div className="coa-MenuInfo__svg">
            <LoveChicken />
          </div>
          <a className="coa-MenuInfo__link">
            More about the alpha.austin.gov project.
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default injectIntl(MenuInfo);
