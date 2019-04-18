import React from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { services as i18n } from 'js/i18n/definitions';

import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';

const Topic = ({
  topic: {
    theme,
    text: title,
    description,
    callToAction,
    topLinks,
    otherLinks,
  },
  intl,
}) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    {/* <PageBreadcrumbs parent={{ ...theme, subpath: 'themes' }} title={title} /> */}
    <PageHeader contentType={'information'} description={description}>
      {title}
    </PageHeader>
    <div className="wrapper container-fluid">
      <TileGroup text={'Top Services'} tiles={topLinks} />
      <TileGroup text={'All Services'} tiles={otherLinks} />
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
