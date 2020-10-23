import React from 'react';
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { news as i18n } from 'js/i18n/definitions';
import PageHeader from 'components/PageHeader';

import ContextualNav from 'components/PageSections/ContextualNav';
import PaginationStatic from 'components/PageSections/Pagination/PaginationStatic.js';
import UserFeedback from 'components/UserFeedback';

const NewsListItem = ({ page }) => {
  const intl = useIntl();

  return (
    <>
      <div className="coa-NewsListPage__news-date">{page.newsDate}</div>
      <div className="coa-NewsListPage__news-link">
        <a href={`/${intl.locale}${page.url}`}>{page.title}</a>
      </div>
    </>
  );
};

const NewsListPage = ({ newsListPage }) => {
  const intl = useIntl();
  const { newsList, parent } = newsListPage ? newsListPage : useRouteData();

  return (
    <div>
      <Head>
        <title>{intl.formatMessage(i18n.news)}</title>
      </Head>
      <ContextualNav parent={parent} />
      <PageHeader contentType={'news-list'}>
        {intl.formatMessage(i18n.news)}
      </PageHeader>
      <div className="coa-Page__all-of-the-content">
        <div className="coa-Page__main-content coa-NewsPage__main-content">
          <PaginationStatic
            pagesArray={newsList}
            PageComponent={NewsListItem}
          />
        </div>
      </div>
      <UserFeedback />
    </div>
  );
};

export default NewsListPage;
