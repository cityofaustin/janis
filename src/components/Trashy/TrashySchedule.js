import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';
import ExternalLink from 'components/ExternalLink';
import { curbsideServices as i18n } from 'js/i18n/definitions';
import { injectIntl } from 'react-intl';

const TrashySchedule = props => {
  const { address, nextBulkPickupDate, pickupDates, intl } = props;

  const mapService = s => {
    let service = s.toLowerCase();
    {
      var cases = {
        textiles: intl.formatMessage(i18n.textiles),
        recycling: intl.formatMessage(i18n.recycling),
        yardtrimmings: intl.formatMessage(i18n.yardtrimmings),
        trash: intl.formatMessage(i18n.trash),
        compost: intl.formatMessage(i18n.compost),
        brushcollection: intl.formatMessage(i18n.brushcollection),
        bulkitemcollection: (
          <ExternalLink to="http://www.austintexas.gov/department/residential-bulk-collection">
            {intl.formatMessage(i18n.bulkitemcollection)}
          </ExternalLink>
        ),
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
            weekday="long"
            year="numeric"
            month="long"
            day="2-digit"
          />
        </h4>
        <ul>{services}</ul>
        {/* {link} */}
      </div>
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

  const bulkItemPickupLink = (
    <ExternalLink to="http://www.austintexas.gov/department/residential-bulk-collection">
      {intl.formatMessage(i18n.bulkitemcollection)}
    </ExternalLink>
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
              defaultMessage={'Next {bulkItemPickupLink}: {bulkPickupDate}'}
              values={{ bulkPickupDate, bulkItemPickupLink }}
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

export default injectIntl(TrashySchedule);
