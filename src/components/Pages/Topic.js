import React, { Fragment } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { services as i18n } from 'js/i18n/definitions';

import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';
import ContextualNav from '../PageSections/ContextualNav';
import RelatedToMobile from '../PageSections/ContextualNav/RelatedToMobile';

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
  <Fragment>
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
        <div className="col-xs-12 coa-TopicPage__tile-group">
          {!!topLinks.length && (
            <TileGroup
              text={intl.formatMessage(i18n.topServices)}
              tiles={topLinks}
            />
          )}
          {!!otherLinks.length && (
            <TileGroup
              text={intl.formatMessage(i18n.allServices)}
              tiles={otherLinks}
            />
          )}
        </div>
      </div>
    </div>
    {/* {console.log(topiccollection)} */}

    <RelatedToMobile topiccollection={topiccollection} topic={topic} />
  </Fragment>
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
