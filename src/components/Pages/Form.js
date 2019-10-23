import React, { useEffect, Fragment } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import path from 'path';
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
    scriptTag,
    coaGlobal,
  },
  intl,
}) {
  // <script type="text/javascript" src="https://cityofaustin.formstack.com/forms/js.php/ni_request_day_laborer"></script><noscript><a href="https://cityofaustin.formstack.com/forms/ni_request_day_laborer" title="Online Form">Online Form - NI Request Day Laborer</a></noscript
  useEffect(() => {
    const formScript = window.document.createElement('script');
    formScript.src = "https://cityofaustin.formstack.com/forms/js.php/ni_request_day_laborer";
    formScript.type = "text/javascript";
    formScript.async = true;

    const formContainer = window.document.getElementById("coa-FormPage__embedded-form");
    formContainer.appendChild(formScript);

    return () => {
      formContainer.removeChild(formScript);
    }
  }, [scriptTag]);

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
            <div id="coa-FormPage__embedded-form">
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
