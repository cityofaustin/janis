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
import { news as i18n } from 'js/i18n/definitions';

import moment from 'moment-timezone';

// const NewsListPageLink = ({ blarg }) => {
//             <Link
//             className="coa-NewsPage__list-page-link"
//             to={`/${intl.locale}${fromDepartment.url}news/`}
//           >
//             <div className="coa-NewsPage__list-page-link-text">
//               {`More ${fromDepartment.title} news`}
//             </div>
//             <i class="material-icons coa-NewsPage__list-page-link-arrow">
//               arrow_forward
//             </i>
//           </Link>
// }

const NewsPage = ({ newsPage }) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  const {
    title,
    body,
    byDepartment,
    fromDepartment,
    parent,
    contact,
    lastPublishedAt,
  } = newsPage ? newsPage : useRouteData();

  // Since previews aren't published, just use the current date for them
  let momentDate = lastPublishedAt
    ? moment(lastPublishedAt, 'YYYY-MM-DD').format('LL')
    : moment().format('LL');

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
              {intl.formatMessage(i18n.publishedDate, { date: momentDate })}
            </div>
            <div className="coa-NewsPage__by-line">
              {byDepartment
                ? intl.formatMessage(i18n.fromAndByLine, {
                    fromDepartment: (
                      <Link to={`/${intl.locale}${fromDepartment.url}`}>
                        {fromDepartment.title}
                      </Link>
                    ),
                    byDepartment: (
                      <Link to={`/${intl.locale}${byDepartment.url}`}>
                        {byDepartment.title}
                      </Link>
                    ),
                  })
                : intl.formatMessage(i18n.fromLine, {
                    fromDepartment: (
                      <Link to={`/${intl.locale}${fromDepartment.url}`}>
                        {fromDepartment.title}
                      </Link>
                    ),
                  })}
            </div>
          </div>
        </div>
      </div>

      <div className="coa-Page__all-of-the-content">
        <div className="coa-Page__main-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-12">
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
          <Link
            className="coa-NewsPage__list-page-link"
            to={`/${intl.locale}${fromDepartment.url}news/`}
          >
            <div className="coa-NewsPage__list-page-link-text">
              {`More ${fromDepartment.title} news`}
            </div>
            <i class="material-icons coa-NewsPage__list-page-link-arrow">
              arrow_forward
            </i>
          </Link>
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
