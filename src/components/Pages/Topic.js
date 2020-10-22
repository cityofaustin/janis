import React, { Fragment } from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { services as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import TileGroup from 'components/Tiles/TileGroup';
import ContextualNav from '../PageSections/ContextualNav';
import RelatedToMobile from '../PageSections/ContextualNav/RelatedToMobile';
import UserFeedback from 'components/UserFeedback';

const Topic = ({ topic, intl }) => {
  const {
    topic: {
      title,
      description,
      topLinks,
      otherLinks,
      topiccollection,
      contextualNavData,
    },
    // not the biggest fan of this logic but
    // it gets previews working with hooks
  } = topic ? { topic } : useRouteData();

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <ContextualNav
        parent={contextualNavData.parent}
        relatedTo={contextualNavData.relatedTo}
        offeredBy={[]}
      />
      <PageHeader contentType={'topic'} description={description}>
        {title}
      </PageHeader>
      <div className="wrapper container-fluid">
        <div className="row">
          <div className="col-xs-12 coa-TopicPage__tile-group">
            {!!topLinks.length && (
              <TileGroup
                title={intl.formatMessage(i18n.topServices)}
                tiles={topLinks}
              />
            )}
            {!!otherLinks.length && (
              <TileGroup
                title={intl.formatMessage(i18n.allPages)}
                tiles={otherLinks}
              />
            )}
          </div>
        </div>
      </div>
      <RelatedToMobile relatedTo={contextualNavData.relatedTo} offeredBy={[]} />
      <UserFeedback />
    </Fragment>
  );
};

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

export default injectIntl(Topic);
