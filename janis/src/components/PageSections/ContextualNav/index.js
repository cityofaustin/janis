import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';

const ContextualNav = ({
  topic,
  topics,
  topiccollection,
  theme,
  department,
  contentType,
  intl,
}) => {
  // Set the parent, if we have a topic, it's because we nav'd from a topic
  // if we don't, use the dept
  const parent = {
    slug: topic
      ? contentType === 'topic'
        ? `/${intl.locale}/${theme.slug}/${topiccollection.slug}`
        : `/${intl.locale}/${theme.slug}/${topiccollection.slug}/${topic.slug}`
      : `/${intl.locale}/${department.slug}`,
    title: topic
      ? contentType === 'topic'
        ? topiccollection.title
        : topic.title
      : department.title,
  };

  // Set the related links
  const related = topiccollection
    ? topiccollection.topics
        .filter(t => t.id !== topic.id)
        .map(t => ({
          slug: `/${intl.locale}/${topiccollection.theme.slug}/${
            topiccollection.slug
          }/${t.slug}`,
          title: t.title,
        }))
    : topics.edges.map(edge => edge.node);

  return (
    <div className="coa-ContextualNav">
      <div className="wrapper container-fluid">
        <div className="coa-ContextualNav__container">
          <div className="coa-ContextualNav__parent">
            <a href={parent.slug} className="coa-ContextualNav__arrow">
              <i className="material-icons">arrow_back</i>
              <span>{parent.title}</span>
            </a>
          </div>
          {!!related.length && (
            <div className="coa-ContextualNav__related">
              <span className="coa-ContextualNav__label">Related to: </span>
              {related.map((topic, index) => (
                <a key={index} href={topic.slug}>
                  {topic.title}
                  {index !== related.length - 1 && ', '}
                </a>
              ))}
            </div>
          )}
          <div className="coa-ContextualNav__dept">
            {department && (
              <Fragment>
                <span className="coa-ContextualNav__label">Offered by: </span>
                <a href={`/${intl.locale}/${department.slug}`}>
                  {department.title}
                </a>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default injectIntl(ContextualNav);
