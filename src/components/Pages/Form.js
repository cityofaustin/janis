import React, { useEffect, Fragment } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import HtmlFromAdmin from 'components/HtmlFromAdmin';
import ApplicationBlock from 'components/ApplicationBlock';
import ContactDetails from 'components/Contact/ContactDetails';
import ContextualNav from 'components/PageSections/ContextualNav';
import RelatedToMobile from '../PageSections/ContextualNav/RelatedToMobile';

function FormPage({
  formPage: {
    text: title,
    slug,
    topic,
    topics,
    theme,
    department,
    relatedDepartments,
    toplink,
    description,
    formUrl,
    coaGlobal,
  },
  intl,
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {!coaGlobal && (
        <ContextualNav
          topic={topic}
          topics={topics}
          topiccollection={topic && topic.topiccollection}
          theme={theme}
          department={department}
          relatedDepartments={relatedDepartments}
        />
      )}
      <div>
        <PageHeader contentType={'information'} description={description}>
          {title}
        </PageHeader>
        <div className="coa-Page__all-of-the-content">
          <div className="coa-Page__main-content">
            <div id="coa-FormPage__embedded-form-container">
              <iframe
                className="coa-FormPage__embedded-form"
                src={formUrl}
                title={title}
                frameborder="0"
              >
              </iframe>
            </div>
          </div>
          <div className="coa-Page__side-content">
          </div>
        </div>
        {!coaGlobal && (
          <RelatedToMobile
            topic={topic}
            topiccollection={topic && topic.topiccollection}
            theme={theme}
            department={department}
          />
        )}
      </div>
    </div>
  );
}

export default withRouteData(injectIntl(FormPage));
