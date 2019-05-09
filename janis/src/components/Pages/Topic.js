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
}) => {
  // Not my favorite way to handle this but I know that adding locales to our
  // slugs and urls in our cleanData functions could break things in a lot more
  // places than doing this here can.
  for (var link of otherLinks) {
    if (link.url.substring(1, 3) !== intl.locale) {
      link.url = `/${intl.locale}${link.url}`;
    }
  }

  for (var link of otherLinks) {
    if (link.url.substring(1, 3) !== intl.locale) {
      link.url = `/${intl.locale}${link.url}`;
    }
  }

  return (
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
      {/* {console.log(topiccollection)} */}

      <RelatedToMobile topiccollection={topiccollection} topic={topic} />
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

export default withRouteData(injectIntl(Topic));
