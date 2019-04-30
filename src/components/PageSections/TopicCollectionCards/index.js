import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import Tile from 'components/Tiles/Tile';
import TopicCollectionCard from './TopicCollectionCard';

class TopicCollectionCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTCCardIndex: null,
    };
  }

  handleTCCardToggle = index => {
    this.setState({
      activeTCCardIndex: index,
    });
  };

  render() {
    const { topics, theme, slug } = this.props;

    return (
      <div className="coa-TopicCollectionCards">
        {topics.map((topic, index) => {
          const pages =
            topic.topLinks && topic.topLinks.length
              ? topic.toplinks
              : topic.otherLinks && topic.otherLinks.length
                ? topic.otherLinks.slice(0, 4)
                : null;

          const servicePages = pages.filter(page => page.type === 'service');
          const infoPages = pages.filter(page => page.type === 'info');

          return (
            <Fragment key={index}>
              {/* <TopicCollectionCard
                key={index}
                pages={pages}
                topic={topic}
                index={index}
                handleTCCardToggle={this.handleTCCardToggle}
                theme={theme}
                servicePages={servicePages}
                infoPages={infoPages}
                activeTCCardIndex={this.state.activeTCCardIndex}
                slug={slug}
              /> */}
              <div
                key={index}
                className={
                  'coa-TopicCollectionCard ' +
                  (this.state.activeTCCardIndex === index
                    ? 'coa-TopicCollectionCard--active'
                    : '')
                }
                onClick={this.handleTCCardToggle.bind(this, index)}
              >
                <h3 className="coa-TopicCollectionCard__title">
                  <a href={`/${theme.slug}/${slug}/${topic.slug}`}>
                    {topic.title}
                  </a>
                  <i className="material-icons coa-TopicCollectionCard__arrow-icon">
                    arrow_right_alt
                  </i>
                  <i class="material-icons coa-TopicCollectionCard__add-icon">
                    add
                  </i>
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
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default injectIntl(TopicCollectionCards);
