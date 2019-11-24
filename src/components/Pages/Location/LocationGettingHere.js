import React from 'react';

const Bus = ({bus}) => (
  <div className="coa-LocationPage__bus">
    {bus}
  </div>
);

const LocationGettingHere = ({buses}) => (
  <div className="coa-LocationPage__section">
    <div className="coa-LocationPage__sub-section">
      <h2 className="coa-LocationPage__sub-section-title">
        Getting here
      </h2>
      <div className="coa-LocationPage__sub-section-block-container">
        <div className="coa-LocationPage__sub-section-block">
          <div className="coa-LocationPage__sub-section-block-title">
            Buses servicing this area
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
);

export default LocationGettingHere;
