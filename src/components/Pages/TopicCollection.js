import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import { topics as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import ContextualNav from '../PageSections/ContextualNav';
import TopicCollectionCards from '../PageSections/TopicCollectionCards';

const TopicCollection = ({ intl }) => {
  const {
    tc: { title, description, theme, topics, slug },
  } = useRouteData();

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
    </div>
  );
};

export default injectIntl(TopicCollection);
