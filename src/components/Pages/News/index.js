import React from 'react';
import { useRouteData, Head } from 'react-static';

import PageHeader from 'components/PageHeader';

import HtmlFromRichText from 'components/HtmlFromRichText';
import ContextualNav from 'components/PageSections/ContextualNav';
import ContactDetails from 'components/Contact/ContactDetails';
import UserFeedback from 'components/UserFeedback';
import RelatedToMobile from 'components/PageSections/ContextualNav/RelatedToMobile';

import { useIntl } from 'react-intl';

const ByLine = ({ byDepartment, fromDepartment, date }) => {
  return (
    <>
      <div>date goes here</div>
      <div>by goes here</div>
    </>
  );
};

const NewsPage = ({ newsPage }) => {
  const intl = useIntl();

  const blarg = useRouteData();

  const {
    title,
    body,
    byDepartment,
    fromDepartment,
    parent,
    contact,
  } = newsPage ? { newsPage } : blarg;

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
              Published April 1, 2020
            </div>
            <div className="coa-NewsPage__by-line">Published April 1, 2020</div>
          </div>
        </div>
      </div>

      <div className="coa-Page__all-of-the-content">
        <div className="coa-Page__main-content">
          <div className="wrapper container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-10">
                {body && <HtmlFromRichText title={' '} content={body} />}
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
