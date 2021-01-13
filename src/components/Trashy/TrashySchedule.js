import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';
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
        bulkitemcollection: intl.formatMessage(i18n.bulkitemcollection),
        xmas_trees: intl.formatMessage(i18n.xmasTrees),
        // removing the link for now, may come back
        // bulkitemcollection: (
        //   <I18nLink to="bulk-item-pickup">
        //     {intl.formatMessage(i18n.bulkitemcollection)}
        //   </I18nLink>
        // ),
      };
      return cases[service];
    }
  };

  const pickUpList = pickupDates.map(item => {
    const services = item.services.map(service => {
      let s = mapService(service);
      // check if service was mapped correctly, otherwise s will be undefined 
      return (s && <li>{s}</li>);
    });

    return (
      !!services.length && services[0] &&
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

  const bulkItemMessage = nextBulkPickupDate ?
  `${intl.formatMessage(i18n.bulkitemcollection)}: {bulkPickupDate}`
  : intl.formatMessage(i18n.invalidDate)

  // If there is no nextBulkPickupDate, then move bulkPickupMessage to top of container
  const bulkPickupMessage = (
    <div className="coa-Trashy__schedule-bulk-pickup">
      <h4>
        <FormattedMessage
          id="trashSchedule.bulkPickUp"
          defaultMessage={bulkItemMessage}
          values={{ bulkPickupDate }}
        />
      </h4>
    </div>
  )

  return (
    <div className="coa-Trashy__schedule-container">
      <div className="coa-Trashy__schedule-header">
        <h3>{intl.formatMessage(i18n.pickupschedule, { address })}</h3>
      </div>
      {!nextBulkPickupDate && bulkPickupMessage}
      <div className="coa-Trashy__schedule-list-container">
        {pickUpList}
        {!!nextBulkPickupDate && bulkPickupMessage}
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
