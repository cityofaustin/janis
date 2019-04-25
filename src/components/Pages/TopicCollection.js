import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { topics as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TileGroup from 'components/Tiles/TileGroup';
import ContextualNav from '../PageSections/ContextualNav';

const TopicCollection = ({ intl, tc: { title, description, topics } }) => (
  <div>
    <div className="wrapper container-fluid">
      {/* <ContextualNav
        topic={topic}
        topiccollection={topic && topic.topiccollection}
        theme={theme}
      /> */}

      <PageHeader>{title}</PageHeader>
      {description && <p>{description}</p>}
    </div>
    <div className="wrapper container-fluid">
      {/*<TileGroup tiles={topics} tag={intl.formatMessage(i18n.topic)} />*/}
    </div>

    {console.log(topics)}
    {topics.map((topic, index) => {
      return (
        <div key={index}>
          <h2>{topic.title}</h2>
          {topic.description && <p>{topic.description}</p>}
          {topic.otherLinks
            ? topic.otherLinks.map((link, index) => (
                <ul>
                  <li key={index}>{link.title}</li>
                </ul>
              ))
            : null}
        </div>
      );
    })}
  </div>
);

export default withRouteData(injectIntl(TopicCollection));
