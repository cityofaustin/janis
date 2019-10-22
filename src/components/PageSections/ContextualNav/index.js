import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { misc as i18n } from 'js/i18n/definitions';
import { Link } from 'react-static';

const ContextualNav = ({ parent, relatedTo, offeredBy, intl }) => (
  <div className="coa-ContextualNav">
    <div className="wrapper container-fluid">
      <div className="coa-ContextualNav__container">
        <div className="coa-ContextualNav__parent">
          <Link
            to={`/${intl.locale}${parent.url}`}
            className="coa-ContextualNav__arrow"
          >
            <span>{parent.title}</span>
          </Link>
        </div>
        {!!relatedTo.length && (
          <div className="coa-ContextualNav__related">
            <span className="coa-ContextualNav__label">
              {`${intl.formatMessage(i18n.relatedTo)}: `}
            </span>
            {relatedTo.map((relatedLinkData, index) => (
              <Link to={`/${intl.locale}${relatedLinkData.url}`}>
                {relatedLinkData.title}
                {index !== relatedTo.length - 1 && ', '}
              </Link>
            ))}
          </div>
        )}
        <div className="coa-ContextualNav__dept">
          {!!offeredBy.length && (
            <Fragment>
              <span className="coa-ContextualNav__label">{`${intl.formatMessage(
                i18n.offeredBy,
              )}: `}</span>
              {offeredBy.map((department, index) => (
                <Link to={`/${intl.locale}${department.url}`}>
                  {department.title}
                  {index !== offeredBy.length - 1 && ', '}
                </Link>
              ))}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default injectIntl(ContextualNav);
