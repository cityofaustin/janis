import React from 'react';
import { useIntl } from 'react-intl';
import { alert as i18n1 } from 'js/i18n/definitions';
import ExternalLink from 'components/ExternalLink';

const LocationsCOVID_19 = (props) => {
  console.log("props :", props)
  return (
    <div>
      City of Austin offices and facilities may be closed or
      have temporary emergency hours that are not up to date on this
      website.&nbsp;
      <a
        href='tel:311'
        className="coa-HomepageAlert__link-external"
      >
        Call 3-1-1
      </a>
      &nbsp;for updated hours information or&nbsp;
      <a
        href="https://www.austintexas.gov/COVID19"
        className="coa-HomepageAlert__link-external"
        target="_blank"
        rel="noopener noreferrer"
      >
        get current information about coronavirus (COVID-19) in Austin.
        <i className="material-icons coa-HomepageAlert__link-icon">open_in_new</i>
      </a>
    </div>
  )
}

export default LocationsCOVID_19;
