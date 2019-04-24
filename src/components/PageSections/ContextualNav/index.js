import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';

const ContextualNav = ({
  topic,
  topics,
  topiccollection,
  theme,
  department,
}) => {
  // Set the parent, if we have a topic, it's because we nav'd from a topic
  // if we don't, use the dept
  const parent = {
    slug: topic
      ? `/${theme.slug}/${topiccollection.slug}/${topic.slug}`
      : `/${department.slug}`,
    title: topic ? topic.title : department.title,
  };

  // Set the related links
  // TODO
  const related = [
    {
      slug: `#`,
      title: `Placeholder`,
    },
    {
      slug: `#`,
      title: `Placeholder`,
    },
  ];

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
          <div className="coa-ContextualNav__related">
            <span className="coa-ContextualNav__label">Related to: </span>
            {related.map((topic, index) => (
              <a key={index} href={topic.slug}>
                {topic.title}
                {index !== related.length - 1 && ', '}
              </a>
            ))}
          </div>
          <div className="coa-ContextualNav__dept">
            {department && (
              <Fragment>
                <span className="coa-ContextualNav__label">Offered by: </span>
                <a href={`/${department.slug}`}>{department.title}</a>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default injectIntl(ContextualNav);
