import React from 'react';
import { withRouteData } from 'react-static';
import PropTypes from 'prop-types';

import TileGroupSet from 'components/Tiles/TileGroupSet';
import PageHeader from 'components/PageHeader';
import { cleanLinks } from 'js/helpers/cleanData';

const Theme = ({ theme }) => {
  const { text: title, callToAction, description, topics } = theme;
  //TODO: clean data where sourced
  let cleanedTopics = cleanLinks(topics, '/topics');
  cleanedTopics.map(topic => {
    topic.tiles = cleanLinks(topic.services, '/services');
  });

  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={title} description={description} />
      </div>

      <div className="wrapper container-fluid">
        <TileGroupSet tileGroups={cleanedTopics} tag="service" />
      </div>
    </div>
  )
}

Theme.propTypes = {
  theme: PropTypes.shape({
    text: PropTypes.string,
    callToAction: PropTypes.string,
    description: PropTypes.string,
    services: PropTypes.string,
    theme: PropTypes.string,
  })
};

export default withRouteData(Theme);
