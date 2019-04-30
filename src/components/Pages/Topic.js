import React from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { services as i18n } from 'js/i18n/definitions';

import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';
import ContextualNav from '../PageSections/ContextualNav';

const Topic = ({
  topic,
  topic: {
    theme,
    text: title,
    description,
    topLinks,
    otherLinks,
    topiccollection,
  },
  intl,
}) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>

    <ContextualNav
      topic={topic}
      topiccollection={topiccollection}
      theme={topiccollection.theme}
      contentType={'topic'}
    />
    <PageHeader contentType={'topic'} description={description}>
      {title}
    </PageHeader>
    <div className="wrapper container-fluid">
      <div className="row">
        <div className="col-xs-12">
          {!!topLinks.length && (
            <TileGroup text={'Top Services'} tiles={topLinks} />
          )}
          {!!otherLinks.length && (
            <TileGroup text={'All Services'} tiles={otherLinks} />
          )}
        </div>
      </div>
    </div>
  </div>
);

Topic.propTypes = {
  topic: PropTypes.shape({
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tiles: PropTypes.array.isRequired,
    theme: PropTypes.shape({
      text: PropTypes.string,
      slug: PropTypes.string,
    }).isRequired,
  }),
};

export default withRouteData(injectIntl(Topic));
