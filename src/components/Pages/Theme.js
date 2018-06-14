import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { services as i18n } from 'js/i18n/definitions';

import TileGroupSet from 'components/Tiles/TileGroupSet';
import PageHeader from 'components/PageHeader';

const Theme = ({ theme: { text: title, description, topics }, intl }) => (
  <div>
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader title={title} description={description} />
    </div>

    <div className="wrapper container-fluid">
      <TileGroupSet
        tileGroups={topics}
        tag={intl.formatMessage(i18n.service)}
      />
    </div>
  </div>
);

Theme.propTypes = {
  theme: PropTypes.shape({
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    topics: PropTypes.array.isRequired,
  }).isRequired,
};

export default withRouteData(injectIntl(Theme));
