import React from 'react';
import { useIntl } from 'react-intl';
import { alert as i18n1 } from 'js/i18n/definitions';
import ExternalLink from 'components/ExternalLink';

const LocationsCOVID_19 = (x) => {
  const lang = useIntl().locale;
  return (
    <div>

      { ( lang=="en" ) && (<>
        City of Austin offices and facilities may be closed or have temporary
        emergency hours that are not up to date on this website.&nbsp;
      </>)}
      { ( lang=="es" ) && (<>
        Es posible que oficinas y servicios de la Ciudad de Austin estén cerrados
        o tengan horarios de emergencia temporales que no están actualizados en
        este sitio. &nbsp;
      </>)}

      <a
        href='tel:311'
        className="coa-HomepageAlert__link-external"
      >
        { ( lang=="en" ) && (<>Call 3-1-1</>)}
        { ( lang=="es" ) && (<>Llame al 3-1-1</>)}
      </a>

      { ( lang=="en" ) && (<>&nbsp;for updated hours information or&nbsp;</>)}
      { ( lang=="es" ) && (<>&nbsp;para obtener horarios actualizados u&nbsp;</>)}

      <a
        href="https://www.austintexas.gov/COVID19"
        className="coa-HomepageAlert__link-external"
        target="_blank"
        rel="noopener noreferrer"
      >
        { ( lang=="en" ) && (<>get current information about coronavirus (COVID-19) in Austin.</>)}
        { ( lang=="es" ) && (<>obtenga información actual sobre el coronavirus (COVID-19) en Austin.</>)}

        <i className="material-icons coa-HomepageAlert__link-icon">open_in_new</i>
      </a>
    </div>
  )
}

export default LocationsCOVID_19;
