import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { topics as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import Tile from 'components/Tiles/Tile';
import ContextualNav from '../PageSections/ContextualNav';

const TopicCollection = ({
  intl,
  tc: { title, description, theme, topics, slug },
}) => (
  <div>
    {/*

    TopicCollection can belong to other TopicCollection or Theme.
    Add placeholder related to

    <ContextualNav
      topic={topic}
      topiccollection={topic && topic.topiccollection}
      theme={theme}
    /> */}

    <PageHeader description={description} contentType={'topic-collection'}>
      {title}
    </PageHeader>

    <div className="wrapper container-fluid">
      <div className="row">
        <div className="col-xs-12">
          <div className="coa-TopicCollectionCard__container">
            {topics.map((topic, index) => {
              const pages =
                topic.topLinks && topic.topLinks.length
                  ? topic.toplinks
                  : topic.otherLinks && topic.otherLinks.length
                    ? topic.otherLinks.slice(0, 4)
                    : null;

              const servicePages = pages.filter(
                page => page.type === 'service',
              );
              const infoPages = pages.filter(page => page.type === 'info');

              return (
                <div key={index} className="coa-TopicCollectionCard">
                  <h3 className="coa-TopicCollectionCard__title">
                    <a href={`/${theme.slug}/${slug}/${topic.slug}`}>
                      {topic.title}
                    </a>
                    <i className="material-icons">arrow_right_alt</i>
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
                          <li
                            className="coa-TopicCollectionCard__item"
                            key={index}
                          >
                            <Tile text={link.title} url={link.url} />
                          </li>
                        ))}
                      {infoPages &&
                        infoPages.map((link, index) => (
                          <li
                            className="coa-TopicCollectionCard__item"
                            key={index}
                          >
                            <a
                              className="coa-TopicCollectionCard__info-link"
                              href={link.url}
                            >
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
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withRouteData(injectIntl(TopicCollection));
