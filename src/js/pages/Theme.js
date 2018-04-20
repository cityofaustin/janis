import React from 'react';
import { withRouteData } from 'react-static';
import PropTypes from 'prop-types';
import { cleanLinks } from 'js/helpers/cleanData';

// TODO: this jsonFileData is temporary. Add it to Wagtail API
import jsonFileData from '__tmpdata/pages';
import TileGroupSet from 'js/modules/TileGroupSet';
import PageHeader from 'js/modules/PageHeader';
import ThreeOneOne from 'js/page_sections/ThreeOneOne';

const Theme = ({ theme }) => {
  const { text: title, callToAction, description, topics } = theme;
  //TODO: clean data where sourced
  let cleanedTopics = cleanLinks(topics, '/topics');
  cleanedTopics.map(topic => {
    topic.tiles = cleanLinks(topic.services, '/services');
  });

  const { services311 } = jsonFileData;

  return (
    <div>
      <div className="wrapper wrapper--sm container-fluid">
        <PageHeader title={title} description={description} />
      </div>

      <div className="wrapper container-fluid">
        <TileGroupSet tileGroups={cleanedTopics} tag="service" />
      </div>

      <ThreeOneOne services311={services311} />
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
