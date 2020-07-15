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

const OfficialDocumentPage = ({ officialDocumentPage, intl }) => {
  const {
    officialDocumentPage: {
      title,
      description,
      contextualNavData,
      pageIsPartOf, // what is this?
      authoringOffice,
      summary,
      date,
      name,
      link,
      pdfSize,
      officialDocumentCollections,
    },
    // not the biggest fan of this logic but
    // it gets previews working with hooks
  } = officialDocumentPage ? { officialDocumentPage } : useRouteData();

  // If the link is a PDF with a pdfSize, then include it.
  console.log(pdfSize);
  const pdfComponent = !!pdfSize ? (
    <span className="coa-OfficialDocumentPage__pdf-size">(PDF {pdfSize})</span>
  ) : null;

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <ContextualNav
        parent={{ title: 'Office of police oversight' }}
        offeredBy={['OPO']}
        /*
          parent={contextualNavData.parent}
          relatedTo={contextualNavData.relatedTo}
          offeredBy={contextualNavData.offeredBy}
          */
      />
      <div>
        {!pageIsPartOf ? (
          <PageHeader
            contentType={'officialDocumentPage'}
            description={description}
            columnWidth={12}
          >
            {title}
          </PageHeader>
        ) : (
          <PageIsPartOfContainer
            pageIsPartOf={[
              {
                guidePageUrl: '/',
                guidePageTitle: 'a',
                ofPageType: 'hi',
                pageType: 'c',
              },
            ]}
            contentType={'information'}
            description={description}
            title={title}
            intl={intl}
          />
        )}

        <div className="coa-Page__all-of-the-content">
          <div className="coa-Page__main-content">
            <div className="wrapper container-fluid">
              <div className="row">
                <div className="col-xs-12 col-md-10">
                  <p className="coa-OfficialDocumentPage__summary">{summary}</p>
                  <div className="coa-OfficialDocumentPage__document">
                    <h2>{intl.formatMessage(i18n.document)}</h2>
                    <a href={link}>{name}</a> {pdfComponent}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="coa-Page__side-content">
            {!!officialDocumentCollections &&
              !!officialDocumentCollections.length && (
                <div className="coa-TileGroup__tiles-container--compact">
                  <span>Part of</span>
                  {officialDocumentCollections.map((collection, index) => (
                    <Tile
                      url={collection.url}
                      text={collection.title}
                      compact={true}
                      key={index}
                      pageType={'officialdocument'}
                    />
                  ))}
                </div>
              )}
          </div>
        </div>
        {/*<RelatedToMobile
          relatedTo={contextualNavData.relatedTo}
          offeredBy={contextualNavData.offeredBy}
        /> */}
      </div>
      <UserFeedback />
    </div>
  );
};

export default injectIntl(OfficialDocumentPage);
