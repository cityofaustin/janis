import React, { useRef } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import IframeResizer from 'iframe-resizer-react'

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
  const iframeRef = useRef(null);

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
            {formUrl && (
              <IframeResizer
                forwardRef={iframeRef}
                src={formUrl}
                className="coa-FormPage__IframeResizer-default"
                frameBorder="0"
              />
            )}
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
