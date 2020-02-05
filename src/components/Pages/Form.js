import React, { useRef, useEffect } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
/**
  In order for IframeResizer to work, you must inject iframeResizer.contentWindow.min.js
  into the source html of page containing your iFrame.
  On Framestack, this is done by modifying the html in the "Advanced Code Editor" of your custom template.
  See: https://github.com/davidjbradshaw/iframe-resizer
**/
import IframeResizer from 'iframe-resizer-react';
import { misc as i18n2, services as i18n3 } from 'js/i18n/definitions';
import { loader } from '../../js/animations/loader';

import PageHeader from 'components/PageHeader';
import HtmlFromRichText from 'components/HtmlFromRichText';
import ApplicationBlock from 'components/ApplicationBlock';
import ContactDetails from 'components/Contact/ContactDetails';
import ContextualNav from 'components/PageSections/ContextualNav';
import RelatedToMobile from '../PageSections/ContextualNav/RelatedToMobile';
import RowContainer from 'components/ErrorMessages/RowContainer';

function FormContainer({
  formContainer: {
    title,
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
    contextualNavData,
  },
  intl,
}) {
  const iframeRef = useRef(null);

  // Go to the top of the page when we transition to the form Confirmation Page.
  // "init" events after the first "init" means that there was a page transition within the iframe.
  let iframeLoaded = false;
  const onResized = ({ iframe, height, width, type }) => {
    if (type === 'init') {
      if (iframeLoaded) {
        document.getElementById('coa-FormContainer__top').scrollIntoView(true);
      } else {
        iframeLoaded = true;
        loader.end()
      }
    }
  }

  setTimeout(function(){
    /* We're allowing 5 sec here to give slow connections time before alerting
    the user that the form may be having problems loading.*/
    if (!iframeLoaded) {
      loader.endError()
    }
  },5000)

  useEffect(() => {
    loader.start({
      contentId: 'coa-iFrameForm',
      loaderId: 'coa-loadingWheel',
      errorId: 'coa-LockedIframeRequestMessage',
      style: "popup"
    })
  }, []) // By having the second argument as an empty string, it will act as "ComponentDidMount" and execute once the component's elements have been added to the dom.

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {!coaGlobal && (
        <ContextualNav
          parent={contextualNavData.parent}
          relatedTo={contextualNavData.relatedTo}
          offeredBy={contextualNavData.offeredBy}
        />
      )}
      <div id="coa-FormContainer__top">
        <PageHeader contentType={'information'} description={description}>
          {title}
        </PageHeader>

        <div id="coa-loadingWheel"></div>
        <RowContainer formUrl={formUrl} ErrorMessage={ErrorMessage}/>

        <div className="coa-Page__all-of-the-content">
          <div className="coa-Page__main-content">
            <div className="coa-FormContainer__iframe-container">
              {formUrl && (
                <IframeResizer
                  id="coa-iFrameForm"
                  forwardRef={iframeRef}
                  src={formUrl}
                  className="coa-FormContainer__IframeResizer-default"
                  heightCalculationMethod="lowestElement"
                  frameBorder="0"
                  onResized={onResized}
                />
              )}
            </div>
          </div>
        </div>
        {!coaGlobal && (
          <RelatedToMobile
            relatedTo={contextualNavData.relatedTo}
            offeredBy={contextualNavData.offeredBy}
          />
        )}
      </div>
    </div>
  );
}

const ErrorMessage = ({formUrl}) => {
  return (
    <div>
      <h2>We are still waiting for your form to load.</h2>

      <h3>Why hasn't it loaded yet?</h3>

      <p>
        &bull; A plugin could be blocking the form (example: "Privacy Badger")
        <br/>
        &bull; It may have failed to load ("404 error")
      </p>
      <br/>

      <h3>Visit the form directly</h3>

      <a href={formUrl} target="_blank"> <p>{formUrl}</p> </a>
    </div>
  )
}

export default withRouteData(injectIntl(FormContainer));
