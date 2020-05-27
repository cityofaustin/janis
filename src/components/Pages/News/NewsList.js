import React from 'react';
import { useRouteData, Head } from 'react-static';
import { useIntl } from 'react-intl';

import PaginationContainer from 'components/PageSections/Pagination/paginationContainer.js';

const NewsListItem = ({ page }) => <div>{page.title}</div>;

const NewsListPage = ({ newsListPage }) => {
  const intl = useIntl();
  const { title, newsList } = newsListPage ? newsListPage : useRouteData();

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
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
