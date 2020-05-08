import React from 'react';
import { useRouteData, Head } from 'react-static';

import PageHeader from 'components/PageHeader';

import HtmlFromRichText from 'components/HtmlFromRichText';
import ContextualNav from 'components/PageSections/ContextualNav';
import ContactDetails from 'components/Contact/ContactDetails';
import UserFeedback from 'components/UserFeedback';
import RelatedToMobile from '../PageSections/ContextualNav/RelatedToMobile';

import { useIntl } from 'react-intl';

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
  debugger;

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <ContextualNav parent={parent} relatedTo={[]} offeredBy={[]} />
      <PageHeader contentType={'information'}>{title}</PageHeader>
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
