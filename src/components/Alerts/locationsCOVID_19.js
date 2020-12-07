import React from 'react';
import { useIntl } from 'react-intl';
import { alert as i18n1 } from 'js/i18n/definitions';

const LocationsCOVID_19 = ({description}) => {
  const intl = useIntl();
  return (
    <div>
      <div className="coa-LocationAlert__block">
        {intl.formatMessage(i18n1.location)}
      </div>
      <div className="coa-LocationAlert__block">
        <a
          href="https://www.austintexas.gov/COVID19"
          className="coa-HomepageAlert__link-external"
          target="_blank"
          rel="noopener noreferrer"
        >
          {description}
          <i className="material-icons coa-HomepageAlert__link-icon">open_in_new</i>
        </a>
      </div>
    </div>
  )
}

export default LocationsCOVID_19;
