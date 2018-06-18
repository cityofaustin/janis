import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { services as i18n } from 'js/i18n/definitions';

import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';

const Topic = ({
  topic: { theme, text: title, description, callToAction, tiles },
  intl,
}) => (
  <div>
    <PageBreadcrumbs parent={{ ...theme, subpath: 'themes' }} title={title} />
    <div className="wrapper wrapper--sm container-fluid">
      <PageHeader title={title} description={description} />
    </div>
    <div className="wrapper wrapper--sm wrapper--hasDashedBorder container-fluid">
      <SectionHeader hasHighlight={true}>{callToAction}</SectionHeader>
    </div>

    <div className="wrapper container-fluid">
      <TileGroup tiles={tiles} tag={intl.formatMessage(i18n.service)} />
    </div>
  </div>
);

Topic.propTypes = {
  topic: PropTypes.shape({
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    callToAction: PropTypes.string.isRequired,
    tiles: PropTypes.array.isRequired,
    theme: PropTypes.shape({
      text: PropTypes.string,
      slug: PropTypes.string,
    }).isRequired,
  }),
};

export default withRouteData(injectIntl(Topic));
