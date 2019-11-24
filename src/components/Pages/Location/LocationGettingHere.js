import React from 'react';
import { useIntl } from 'react-intl';
import { locations as i18nLocations } from 'js/i18n/definitions';

const Bus = ({bus}) => (
  <div className="coa-LocationPage__bus">
    {bus}
  </div>
);

const LocationGettingHere = ({buses}) => {
  const intl = useIntl();
  return (
    <div className="coa-LocationPage__section">
      <div className="coa-LocationPage__sub-section">
        <h2 className="coa-LocationPage__sub-section-title">
          {intl.formatMessage(i18nLocations.gettingHere)}
        </h2>
        <div className="coa-LocationPage__sub-section-block-container">
          <div className="coa-LocationPage__sub-section-block">
            <div className="coa-LocationPage__sub-section-block-title">
              {intl.formatMessage(i18nLocations.busesServicing)}
            </div>
            <div className="coa-LocationPage__sub-section-block-contents">
              <div className="coa-LocationPage__bus-container">
                {buses.map((bus, i)=>(
                  <Bus
                    key={i}
                    bus={bus}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LocationGettingHere;
