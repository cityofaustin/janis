import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import TileGroup from 'components/Tiles/TileGroup';
import { misc as i18n1 } from 'js/i18n/definitions';

const TopicCard = ({ topic, index, intl }) => {
  const tiles =
    topic.pages &&
    topic.pages.map(p => ({
      url: p.url,
      title: p.title,
      pageType: p.pageType,
    }));
  // This and TileGroup have a fragile relationship so
  // I copypasta'd logic into the learn more link instead of modifying it
  const titleUrl = `/${topic.topiccollection.theme.slug}/${
    topic.topiccollection.slug
  }/${topic.slug}`;

  return (
    !!tiles && (
      <div key={titleUrl} className="coa-TopicCollectionCard">
        <TileGroup
          title={`${topic.title} →`}
          titleUrl={titleUrl}
          description={topic.description}
          tiles={tiles}
          allowEmptyTiles
          compact
        />
        <a
          href={
            titleUrl.substring(0, 4) === 'http'
              ? titleUrl
              : `/${intl.locale}${titleUrl}`
          }
          className="coa-TopicCollectionCard__learn-more-link"
        >
          <p>{intl.formatMessage(i18n1.learnMore)}</p>
          <i className="material-icons">arrow_forward</i>
        </a>
      </div>
    )
  );
};

const TopicCollectionCards = ({ topics, intl }) => (
  <div className="coa-TopicCollectionCards">
    {topics.map((topic, index) => (
      <TopicCard topic={topic} index={index} intl={intl} key={index} />
    ))}
  </div>
);

export default injectIntl(TopicCollectionCards);
