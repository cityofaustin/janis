import React, { Fragment } from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import path from 'path';

import { officialdocuments as i18n } from 'js/i18n/definitions';

import PageHeader from 'components/PageHeader';
import ContextualNav from 'components/PageSections/ContextualNav';
import RelatedToMobile from 'components/PageSections/ContextualNav/RelatedToMobile';
import Tile from 'components/Tiles/Tile';
import UserFeedback from 'components/UserFeedback';
import HtmlFromRichText from 'components/HtmlFromRichText';

const OfficialDocumentCollectionsList = ({
  officialDocumentCollection,
  mobile,
  intl
}) =>
  !!officialDocumentCollection && !!officialDocumentCollection.length ? (
    <div
      className={
        'coa-OfficialDocumentPage__tiles-container' +
        (mobile ? ' coa-OfficialDocumentPage__tiles-mobile' : '')
      }
    >
      <p className="coa-OfficialDocumentPage__side-content-heading">{intl.formatMessage(i18n.partOf)}</p>
      {officialDocumentCollection.map((collection, index) => (
        <Tile
          url={collection.url}
          text={collection.title}
          compact={true}
          key={index}
          pageType={'officialdocument'}
        />
      ))}
    </div>
  ) : null;

const OfficialDocumentPage = ({ officialDocumentPage, intl }) => {
  const {
    officialDocumentPage: {
      title,
      description,
      contextualNavData,
      authoringOffice,
      summary,
      date,
      name,
      pdfSize,
      document,
      officialDocumentCollection,
    },
    // not the biggest fan of this logic but
    // it gets previews working with hooks
  } = officialDocumentPage ? { officialDocumentPage } : useRouteData();

  // If the link is a PDF with a pdfSize, then include it.
  const pdfComponent = !!pdfSize ? (
    <span className="coa-OfficialDocumentPage__pdf-size">(PDF {pdfSize})</span>
  ) : null;

  const summaryBlock = <HtmlFromRichText content={summary} /> 

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <ContextualNav
        parent={contextualNavData.parent}
        relatedTo={contextualNavData.relatedTo}
        offeredBy={contextualNavData.offeredBy}
      />
      <div>
        <PageHeader
          contentType={'officialDocumentPage'}
          description={description}
          columnWidth={8}
        >
          {title}
        </PageHeader>

        <div className="coa-Page__all-of-the-content">
          <div className="coa-Page__main-content">
            <div className="wrapper container-fluid">
              <div className="row">
                <p className="coa-OfficialDocumentPage__summary">{summaryBlock}</p>
                <OfficialDocumentCollectionsList
                  officialDocumentCollection={officialDocumentCollection}
                  mobile={true}
                  intl={intl}
                />
                <div className="coa-OfficialDocumentPage__document">
                  <h2>{intl.formatMessage(i18n.document)}</h2>
                  <a href={document.url}>{name}</a> {pdfComponent}
                </div>
              </div>
            </div>
          </div>
          <div className="coa-OfficialDocumentPage__side-content">
            <OfficialDocumentCollectionsList
              officialDocumentCollection={officialDocumentCollection}
              intl={intl}
            />
          </div>
        </div>
        <RelatedToMobile
          relatedTo={contextualNavData.relatedTo}
          offeredBy={contextualNavData.offeredBy}
        />
      </div>
      <UserFeedback />
    </div>
  );
};

export default injectIntl(OfficialDocumentPage);
