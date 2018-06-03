import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';
import ExternalLink from 'components/ExternalLink';
import I18nLink from 'components/I18n/I18nLink';
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
          <I18nLink to="services/bulk-item-pickup">
            {intl.formatMessage(i18n.bulkitemcollection)}
          </I18nLink>
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

  const bulkItemPickupLink = (
    <I18nLink to="services/bulk-item-pickup">
      {intl.formatMessage(i18n.bulkitemcollection)}
    </I18nLink>
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
