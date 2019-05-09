import React from 'react';
import { injectIntl } from 'react-intl';

const RelatedToMobile = ({ topiccollection, topic }) => {
  // Set the related links, taken from ContextualNav
  const related = topiccollection
    ? topiccollection.topics.filter(t => t.id !== topic.id).map(t => ({
        slug: `/${topiccollection.theme.slug}/${topiccollection.slug}/${
          t.slug
        }`,
        title: t.title,
      }))
    : topics.edges.map(edge => edge.node);

  return related.length > 0 ? (
    <div className="coa-RelatedToMobile">
      <div className="wrapper container-fluid">
        <div className="col-xs-12">
          <h2 className="coa-RelatedToMobile__title">Related To:</h2>
          <ul>
            {related.map((topic, index) => (
              <li key={index} className="coa-RelatedToMobile__item">
                <a href={topic.slug} className="coa-RelatedToMobile__link">
                  {topic.title}
                  {index !== related.length - 1 && ', '}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
};

export default injectIntl(RelatedToMobile);
