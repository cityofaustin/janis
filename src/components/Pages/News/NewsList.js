import React from 'react';
import { useRouteData, Head } from 'react-static';

const NewsListPage = ({ newsListPage }) => {
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
                {newsList.map(newsItem => (
                  <div>{newsItem.title}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsListPage;
