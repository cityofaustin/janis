import React from 'react';
import { useIntl } from 'react-intl';
import { alert as i18n1 } from 'js/i18n/definitions';
import ExternalLink from 'components/ExternalLink';


const HomepageAlert = ({ }) => {
  const intl = useIntl();

  return (
    <div className="coa-HomepageAlert__container">
      <div className="coa-HomepageAlert__content">
        <div className="coa-HomepageAlert__label">
          <div className="coa-HomepageAlert__label--text">
            <i class="material-icons">
              info_outline
            </i>
            Coronavirus (COVID-19)
          </div>
        </div>
        <div className="coa-HomepageAlert__link">
          <ExternalLink to="http://www.austintexas.gov/COVID19">
            {intl.formatMessage(i18n1.getLatest)}
          </ExternalLink>
        </div>
      </div>
    </div>
  )
};


export default HomepageAlert;
