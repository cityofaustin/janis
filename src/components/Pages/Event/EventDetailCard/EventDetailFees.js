import React from 'react';
import { useIntl } from 'react-intl';
import { events as i18n } from 'js/i18n/definitions';

const EventDetailFees = ({ eventIsFree, fees, registrationUrl }) => {
  const intl = useIntl();

  const registrationLinkFragment = (
    <React.Fragment>
      {registrationUrl ? (
        <a href={registrationUrl}>{intl.formatMessage(i18n.register)}</a>
      ) : (
        intl.formatMessage(i18n.public)
      )}
    </React.Fragment>
  );

  return (
    <div className="coa-EventDetailItem">
      <i className="material-icons">local_play</i>
      <div className="coa-EventDetailItem__content">
        {eventIsFree ? (
          <div className="coa-EventDetailItem__fees-free">
            <div>{`${intl.formatMessage(i18n.free)}`}</div>
            <div>{registrationLinkFragment}</div>
          </div>
        ) : (
          !!fees &&
          !!fees.edges &&
          !!fees.edges.length && (
            <React.Fragment>
              {fees.edges.map(edge => (
                <div>
                  {!!edge.node.feeLabel && `${edge.node.feeLabel}: `}
                  {edge.node.fee === 0
                    ? intl.formatMessage(i18n.free)
                    : `$${edge.node.fee}`}
                </div>
              ))}
              <div>{registrationLinkFragment}</div>
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
};

export default EventDetailFees;
