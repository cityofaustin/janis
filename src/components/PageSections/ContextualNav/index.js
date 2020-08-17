import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { misc as i18n } from 'js/i18n/definitions';

const ContextualNav = ({ parent, relatedTo, offeredBy, intl }) => (
  <div className="coa-ContextualNav">
    <div className="wrapper container-fluid">
      <div className="coa-ContextualNav__container">
        <div className="coa-ContextualNav__parent">
          <a
            href={`/${intl.locale}${parent.url}`}
            className="coa-ContextualNav__arrow"
          >
            <span>{parent.title}</span>
          </a>
        </div>
        {!!relatedTo && !!relatedTo.length && (
          <div className="coa-ContextualNav__related">
            <span className="coa-ContextualNav__label">
              {`${intl.formatMessage(i18n.relatedTo)}: `}
            </span>
            {relatedTo.map((relatedLinkData, index) => (
              <a
                href={`/${intl.locale}${relatedLinkData.url}`}
                key={relatedLinkData.url}
              >
                {relatedLinkData.title}
                {index !== relatedTo.length - 1 && ', '}
              </a>
            ))}
          </div>
        )}
        <div className="coa-ContextualNav__dept">
          {!!offeredBy && !!offeredBy.length && (
            <Fragment>
              <span className="coa-ContextualNav__label">{`${intl.formatMessage(
                i18n.offeredBy,
              )}: `}</span>
              {offeredBy.map((department, index) => (
                <a
                  href={`/${intl.locale}${department.url}`}
                  key={department.url}
                >
                  {department.title}
                  {index !== offeredBy.length - 1 && ', '}
                </a>
              ))}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  </div>
);

ContextualNav.propTypes = {
  parent: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  relatedTo: PropTypes.array,
  offeredBy: PropTypes.array,
};

export default injectIntl(ContextualNav);
