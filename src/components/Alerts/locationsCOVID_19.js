import React from 'react';
import { useIntl } from 'react-intl';
import { alert as i18n1 } from 'js/i18n/definitions';

const LocationsCOVID_19 = ({ description }) => {
  const intl = useIntl();
  return (
    <div>
      <div className="coa-LocationAlert__block">
        {intl.formatMessage(i18n1.location)}
      </div>
      <a
        href="https://www.austintexas.gov/COVID19"
        className="coa-LocationAlert__link-external"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="coa-LocationAlert__block">
          {description}
          <i className="material-icons coa-LocationAlert__link-icon">
            open_in_new
          </i>
        </div>
      </a>
    </div>
  );
};

export default LocationsCOVID_19;
