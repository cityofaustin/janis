import React from 'react';
import { withRouteData } from 'react-static';
import { injectIntl } from 'react-intl';

import { topics as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import ContextualNav from '../PageSections/ContextualNav';
import TopicCollectionCards from '../PageSections/TopicCollectionCards';

const TopicCollection = ({
  intl,
  tc: { title, description, theme, topics, slug },
}) => (
  <div>
    {
      // TopicCollection can belong to other TopicCollection or Theme.
      // Add placeholder related to
    }

    {/* <ContextualNav
        topic={topic}
        topiccollection={topic && topic.topiccollection}
        theme={theme}
      /> */}

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

export default withRouteData(injectIntl(TopicCollection));
