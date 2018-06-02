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
      <React.Fragment>
        <h4>
          <FormattedDate
            value={item.date}
            weekday="long"
            year="numeric"
            month="long"
            day="2-digit"
          />
        </h4>
        <ul>{services}</ul>
      </React.Fragment>
    );
  });

  const bulkPickupDate = (
    <FormattedDate
      value={nextBulkPickupDate}
      weekday="long"
      year="numeric"
      month="long"
      day="2-digit"
    />
  );

  return (
    <div>
      <div className="scheduleHeader">
        <h3>
          <FormattedMessage
            id="trashSchedule.pickup_schedule"
            defaultMessage={"Here's the pickup schedule for {address} "}
            values={{ address }}
          />
        </h3>
      </div>
      <div className="schedule">{pickUpList}</div>
      <div className="bulkPickUp">
        <h4>
          <FormattedMessage
            id="trashSchedule.bulkPickUp"
            defaultMessage={'Next bulk item pickup: {bulkPickupDate}'}
            values={{ bulkPickupDate }}
          />
        </h4>
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
