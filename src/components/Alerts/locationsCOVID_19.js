import React from 'react';
import { useIntl } from 'react-intl';
import { alert as i18n1 } from 'js/i18n/definitions';
import ExternalLink from 'components/ExternalLink';

const LocationsCOVID_19 = () => {
  const lang = useIntl().locale;
  return (
    <div>

      { ( lang === "en" ) && (<>
        City of Austin offices and facilities may be closed or have temporary
        emergency hours that are not up to date on this website.&nbsp;
      </>)}
      { ( lang === "es" ) && (<>
        Las oficinas e instalaciones de la Ciudad de Austin quizás estén cerradas
        o tengan horario de emergencia temporal que no se ha actualizado
        en este sitio web. &nbsp;
      </>)}

      <a
        href='tel:15129742000'
        className="coa-HomepageAlert__link-external"
      >
        { ( lang === "en" ) && (<>Call 3-1-1</>)}
        { ( lang === "es" ) && (<>Llame al 3-1-1</>)}
      </a>

      { ( lang === "en" ) && (<>&nbsp;for updated hours information or&nbsp;</>)}
      { ( lang === "es" ) && (<>&nbsp;para información actualizada sobre horarios o&nbsp;</>)}

      <a
        href="/government-business/covid-information-and-resources/"
        className="coa-HomepageAlert__link-external"
        rel="noopener noreferrer"
      >
        { ( lang === "en" ) && (<>get current information about coronavirus (COVID-19) in Austin.</>)}
        { ( lang === "es" ) && (<>obtenga información actual sobre el coronavirus (COVID-19) en Austin.</>)}

        {/*
          Just gonna keep this noted out here for Demo use case.
          <i className="material-icons coa-HomepageAlert__link-icon">open_in_new</i>
        */}

      </a>
    </div>
  )
}

export default LocationsCOVID_19;
