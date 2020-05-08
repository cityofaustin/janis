import React from 'react';
import { useRouteData, Head } from 'react-static';

import PageHeader from 'components/PageHeader';

import HtmlFromRichText from 'components/HtmlFromRichText';
import ContextualNav from 'components/PageSections/ContextualNav';
import ContactDetails from 'components/Contact/ContactDetails';
import UserFeedback from 'components/UserFeedback';
import RelatedToMobile from 'components/PageSections/ContextualNav/RelatedToMobile';

import { Link } from 'react-router-dom';

import { useIntl } from 'react-intl';

import moment from 'moment-timezone';

const NewsPage = ({ newsPage }) => {
  const intl = useIntl();
  moment.locale(intl.locale);
  const blarg = useRouteData();

  const {
    title,
    body,
    byDepartment,
    fromDepartment,
    parent,
    contact,
    lastPublishedAt,
  } = newsPage ? { newsPage } : blarg;
  debugger;

  let momentDate = moment(lastPublishedAt, 'YYYY-MM-DD').format('LL');

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <ContextualNav parent={parent} relatedTo={[]} offeredBy={[]} />
      <PageHeader contentType={'news'} columnWidth={12}>
        {title}
      </PageHeader>
      <div className="wrapper container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <div className="coa-NewsPage__published-date">
              Published {momentDate}
            </div>
            <div className="coa-NewsPage__by-line">
              {byDepartment ? (
                <>
                  From{' '}
                  <Link to={`/${intl.locale}${fromDepartment.url}`}>
                    {fromDepartment.title}
                  </Link>
                  , written by{' '}
                  <Link to={`/${intl.locale}${byDepartment.url}`}>
                    {byDepartment.title}
                  </Link>
                </>
              ) : (
                <>
                  From{' '}
                  <Link to={`/${intl.locale}${fromDepartment.url}`}>
                    {fromDepartment.title}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="coa-Page__all-of-the-content">
        <div className="coa-Page__main-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-10">
                {body && <HtmlFromRichText title={' '} content={body} />}
                <div className="coa-NewsPage__footer-published-date">
                  Published {momentDate}
                </div>
                <div className="coa-Page__contacts-mobile">
                  {!!contact && <ContactDetails contact={contact} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="coa-Page__side-content">
          <div className="coa-ServicePage__contacts-desktop">
            {!!contact && <ContactDetails contact={contact} />}
          </div>
        </div>
      </div>
      <UserFeedback />
    </div>
  );
};

export default NewsPage;
