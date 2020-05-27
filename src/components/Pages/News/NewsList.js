import React from 'react';
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';
import { news as i18n } from 'js/i18n/definitions';
import { Link } from 'react-router-dom';
import PageHeader from 'components/PageHeader';

import ContextualNav from 'components/PageSections/ContextualNav';
import PaginationContainer from 'components/PageSections/Pagination/paginationContainer.js';

const NewsListItem = ({ page }) => {
  const intl = useIntl();

  return (
    <>
      <div className="coa-DepartmentPage__news-date">{page.newsDate}</div>
      <div className="coa-DepartmentPage__news-link">
        <Link to={`/${intl.locale}${page.url}`}>{page.title}</Link>
      </div>
    </>
  );
};

const NewsListPage = ({ newsListPage }) => {
  const intl = useIntl();
  const blarg = useRouteData();
  const { newsList, parent } = newsListPage ? newsListPage : blarg;

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
        <div className="coa-Page__main-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-12">
                <PaginationContainer
                  pagesArray={newsList}
                  PageComponent={NewsListItem}
                  intl={intl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsListPage;
