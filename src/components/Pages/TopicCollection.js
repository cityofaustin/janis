import React from 'react';
import PropTypes from 'prop-types';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import { topics as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import TopicCollectionCards from '../PageSections/TopicCollectionCards';
import UserFeedback from 'components/UserFeedback';

const TopicCollection = ({ tc, intl }) => {
  const {
    tc: { title, description, theme, topics, slug },
    // not the biggest fan of this logic but
    // it gets previews working with hooks
  } = tc ? { tc } : useRouteData();

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <PageHeader description={description} contentType={'topic-collection'}>
        {title}
      </PageHeader>

      <div className="wrapper container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <TopicCollectionCards topics={topics} theme={theme} slug={slug} />
          </div>
        </div>
      </div>
      <UserFeedback />
    </div>
  );
};

TopicCollection.propTypes = {
  title:PropTypes.string,
  description:PropTypes.string,
  theme:PropTypes.string,
  topics:PropTypes.array,
  slug:PropTypes.string,
}

export default injectIntl(TopicCollection);
