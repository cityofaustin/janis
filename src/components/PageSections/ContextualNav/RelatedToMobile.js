import React from 'react';
import { injectIntl } from 'react-intl';

const RelatedToMobile = ({ topiccollection, topic, department }) => {
  // Making it easier on us for when we add support for multiple departments
  const departments = !!department ? [department] : null;

  // Set the related links, taken from ContextualNav
  const related =
    topiccollection &&
    topiccollection.topics &&
    topiccollection.topics
      .filter(t => t.id !== topic.id)
      .map(t => ({
        slug: `/${topiccollection.theme.slug}/${topiccollection.slug}/${
          t.slug
        }`,
        title: t.title,
      }));

  const weHaveTopics = !!related && related.length > 0;
  const weHaveDepts = !!departments && departments.length > 0;

  return (
    <div className="coa-RelatedToMobile">
      <div className="wrapper container-fluid">
        {weHaveTopics && (
          <div className="col-xs-12">
            <h2 className="coa-RelatedToMobile__title">Related to</h2>
            <ul>
              {related.map((topic, index) => (
                <li key={index} className="coa-RelatedToMobile__item">
                  <a href={topic.slug} className="coa-RelatedToMobile__link">
                    {topic.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {weHaveDepts && (
          <div className="col-xs-12">
            <h2
              className={
                weHaveTopics && weHaveDepts
                  ? 'coa-RelatedToMobile__second-title'
                  : 'coa-RelatedToMobile__title'
              }
            >
              Offered by
            </h2>
            <ul>
              {departments.map((dept, index) => (
                <li key={index} className="coa-RelatedToMobile__item">
                  <a href={dept.slug} className="coa-RelatedToMobile__link">
                    {dept.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default injectIntl(RelatedToMobile);
