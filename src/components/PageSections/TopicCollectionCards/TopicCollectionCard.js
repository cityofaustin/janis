import React from 'react';
import { injectIntl } from 'react-intl';
import Tile from 'components/Tiles/Tile';

const TopicCollectionCard = (
  index,
  topic,
  pages,
  handleTCCardToggle,
  theme,
  slug,
  servicePages,
  infoPages,
  activeTCCardIndex,
) => (
  <div
    className={
      'coa-TopicCollectionCard ' +
      (activeTCCardIndex === index ? 'coa-TopicCollectionCard--active' : '')
    }
    // onClick={handleTCCardToggle.bind(this, index)}
    onClick={handleTCCardToggle}
  >
    <h3 className="coa-TopicCollectionCard__title">
      <a href={`/${theme.slug}/${slug}/${topic.slug}`}>{topic.title}</a>
      <i className="material-icons coa-TopicCollectionCard__arrow-icon">
        arrow_right_alt
      </i>
      <i class="material-icons coa-TopicCollectionCard__add-icon">add</i>
    </h3>
    {topic.description && (
      <p className="coa-TopicCollectionCard__description">
        {topic.description}
      </p>
    )}
    {pages ? (
      <ul className="coa-TopicCollectionCard__links">
        {servicePages &&
          servicePages.map((link, index) => (
            <li className="coa-TopicCollectionCard__item" key={index}>
              <Tile text={link.title} url={link.url} />
            </li>
          ))}
        {infoPages &&
          infoPages.map((link, index) => (
            <li className="coa-TopicCollectionCard__item" key={index}>
              <a className="coa-TopicCollectionCard__info-link" href={link.url}>
                {link.title}
              </a>
            </li>
          ))}
      </ul>
    ) : null}
    <a
      href={`/${theme.slug}/${slug}/${topic.slug}`}
      className="coa-TopicCollectionCard__link"
    >
      Learn More
    </a>
  </div>
);

export default injectIntl(TopicCollectionCard);
