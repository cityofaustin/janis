import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { services as i18n } from 'js/i18n/definitions';

import TileGroupSet from 'components/Tiles/TileGroupSet';
import PageHeader from 'components/PageHeader';
import FormFeedback from 'components/FormFeedback';
import { cleanLinks } from 'js/helpers/cleanData';

const Theme = ({ theme, intl }) => {
  const { text: title, description, topics } = theme;
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
        <TileGroupSet
          tileGroups={cleanedTopics}
          tag={intl.formatMessage(i18n.service)}
        />
      </div>

      <div className="wrapper wrapper--sm container-fluid">
        <FormFeedback />
      </div>
    </div>
  );
};

Theme.propTypes = {
  theme: PropTypes.shape({
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    topics: PropTypes.object.isRequired,
  }).isRequired,
};

export default withRouteData(injectIntl(Theme));
