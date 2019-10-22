import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { misc as i18n } from 'js/i18n/definitions';
import { Link } from 'react-static';

const ContextualNav = ({ parent, relatedTo, offeredBy, intl }) => {
  // const offeredBy = [];
  debugger;

  // // Set the related links if we have a topic collection
  // let related = [];
  // if (topiccollection) {
  //   related = topiccollection
  //     ? topiccollection.topics
  //         .filter(t => t.id !== topic.id)
  //         .map(t => ({
  //           slug: `/${intl.locale}/${topiccollection.theme.slug}/${
  //             topiccollection.slug
  //           }/${t.slug}`,
  //           title: t.title,
  //         }))
  //     : topics.edges.map(edge => edge.node);
  // }

  // // Set the 'offered by' departments if we have them
  // let offeredBy = [];
  // if (relatedDepartments) {
  //   offeredBy = relatedDepartments.edges.map(e => e.node.relatedDepartment);
  // }

  return (
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
                  <a href={`/${intl.locale}/${department.slug}`}>
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
};
export default injectIntl(ContextualNav);

/*

          <div className="coa-ContextualNav__dept">
            {!!offeredBy.length && (
              <Fragment>
                <span className="coa-ContextualNav__label">{`${intl.formatMessage(
                  i18n.offeredBy,
                )}: `}</span>
                {offeredBy.map((department, index) => (
                  <a href={`/${intl.locale}/${department.slug}`}>
                    {department.title}
                    {index !== offeredBy.length - 1 && ', '}
                  </a>
                ))}
              </Fragment>
            )}
          </div>

*/
