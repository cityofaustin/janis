import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import TileGroup from 'components/Tiles/TileGroup';
import { misc as i18n1 } from 'js/i18n/definitions';

const TopicCard = ({ topic, index }) => {
  const pages =
    topic.topLinks && topic.topLinks.length
      ? topic.toplinks
      : topic.otherLinks && topic.otherLinks.length
      ? topic.otherLinks.slice(0, 4)
      : null;

  const tiles = pages.map(p => ({ url: p.url, title: p.title }));

  debugger;

  return (
    <div key={index} className="coa-TopicCollectionCard">
      <TileGroup
        title={`${topic.title} →`}
        titleUrl={`/${topic.topiccollection.theme.slug}/${
          topic.topiccollection.slug
        }/${topic.slug}`}
        description={topic.description}
        tiles={tiles}
        compact
      />
    </div>
  );
};

const TopicCollectionCards = ({ topics, theme, slug, intl }) => (
  <div className="coa-TopicCollectionCards">
    {topics.map((topic, index) => (
      <TopicCard topic={topic} index={index} />
    ))}
  </div>
);

export default injectIntl(TopicCollectionCards);
