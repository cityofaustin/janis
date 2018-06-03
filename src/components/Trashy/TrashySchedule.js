import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';

const TrashySchedule = props => {
  const { address, nextBulkPickupDate, pickupDates } = props;

  const mapService = s => {
    let service = s.toLowerCase();
    {
      var cases = {
        textiles: 'Clothing & Housewares Recycling',
        recycling: 'Recycling',
        yardtrimmings: 'Yard Trimmings',
        trash: 'Trash',
        compost: 'Compost',
        bulkitemcollection: 'Bulk Item Collection',
      };
      return cases[service];
    }
  };

  const pickUpList = pickupDates.map(item => {
    const services = item.services.map(service => {
      let s = mapService(service);
      return <li>{s}</li>;
    });

    return (
      <div className="coa-Trashy__schedule-list-pickup-item">
        <h4>
          <FormattedDate
            value={item.date}
            timeZone="UTC"
            weekday="long"
            year="numeric"
            month="long"
            day="2-digit"
          />
        </h4>
        <ul>{services}</ul>
      </div>
    );
  });

  const bulkPickupDate = (
    <FormattedDate
      value={nextBulkPickupDate}
      timeZone="UTC"
      weekday="long"
      year="numeric"
      month="long"
      day="2-digit"
    />
  );

  return (
    <div className="coa-Trashy__schedule-container">
      <div className="coa-Trashy__schedule-header">
        <h3>
          <FormattedMessage
            id="trashSchedule.pickup_schedule"
            defaultMessage={"Here's the pickup schedule for {address} "}
            values={{ address }}
          />
        </h3>
      </div>
      <div className="coa-Trashy__schedule-list-container">
        {pickUpList}
        <div className="coa-Trashy__schedule-bulk-pickup">
          <h4>
            <FormattedMessage
              id="trashSchedule.bulkPickUp"
              defaultMessage={'Next bulk item pickup: {bulkPickupDate}'}
              values={{ bulkPickupDate }}
            />
          </h4>
        </div>
      </div>
    </div>
  );
};

TrashySchedule.propTypes = {
  address: PropTypes.string,
  nextBulkPickupDate: PropTypes.string,
  pickupDates: PropTypes.array,
};

export default TrashySchedule;
