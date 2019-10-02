import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import TileGroup from 'components/Tiles/TileGroup';
import { misc as i18n1 } from 'js/i18n/definitions';
import { Link } from 'react-static';

const TopicCard = ({ topic, index, intl }) => {
  const pages =
    topic.topLinks && topic.topLinks.length
      ? topic.toplinks
      : topic.otherLinks && topic.otherLinks.length
      ? topic.otherLinks.slice(0, 4)
      : null;

  const tiles = pages && pages.map(p => ({ url: p.url, title: p.title }));

  // This and TileGroup have a fragile relationship so
  // I copypasta'd logic into the learn more link instead of modifying it
  const titleUrl = `/${topic.topiccollection.theme.slug}/${
    topic.topiccollection.slug
  }/${topic.slug}`;

  return (
    !!tiles && (
      <div key={index} className="coa-TopicCollectionCard">
        <TileGroup
          title={`${topic.title} →`}
          titleUrl={titleUrl}
          description={topic.description}
          tiles={tiles}
          compact
        />
        <Link
          to={
            titleUrl.substring(0, 4) === 'http'
              ? titleUrl
              : `/${intl.locale}${titleUrl}`
          }
          className="coa-TopicCollectionCard__learn-more-link"
        >
          <p>{intl.formatMessage(i18n1.learnMore)}</p>
          <i className="material-icons">arrow_forward</i>
        </Link>
      </div>
    )
  );
};

const TopicCollectionCards = ({ topics, theme, slug, intl }) => (
  <div className="coa-TopicCollectionCards">
    {topics.map((topic, index) => (
      <TopicCard topic={topic} index={index} intl={intl} />
    ))}
  </div>
);

export default injectIntl(TopicCollectionCards);
