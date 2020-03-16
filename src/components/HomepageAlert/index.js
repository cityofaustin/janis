import React from 'react';
import { useIntl } from 'react-intl';
import { alert as i18n1 } from 'js/i18n/definitions';


const HomepageAlert = ({ }) => {
  const intl = useIntl();

  return (
    <div className="coa-HomepageAlert__container">
      <div className="coa-HomepageAlert__content">
        <div className="coa-HomepageAlert__label">
          <div className="coa-HomepageAlert__label--text">
            Coronavirus (COVID-19)
          </div>
        </div>
        <div className="coa-HomepageAlert__link">
          Get the latest Coronavirus (COVID-19) updates
        </div>
      </div>
    </div>
  )
};


export default HomepageAlert;
