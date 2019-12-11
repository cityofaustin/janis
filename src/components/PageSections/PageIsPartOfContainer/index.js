import React, { Fragment } from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import PageHeader from 'components/PageHeader';
import Tile from 'components/Tiles/Tile';

const PageIsPartOfContainer = ({ pageIsPartOf, contentType, description, title, intl }) => {

  return (
    <div className={"coa-Page__pageIsPartOfContainer"+(contentType === "service" ? "--service" : "")}>

      <div className="coa-Page__all-of-the-content" >

        <div className="coa-Page__main-content" >
          <div className="row">
            <div className="col-xs-12 col-md-11">
              <PageHeader
                contentType={(contentType === "information" ? "information" : "")}
                description={description}
                columnWidth="12">
                {title}
              </PageHeader>
              <div className={"coa-Page__contacts-mobile pageIsPartOf"+(contentType === "service" ? " service" : "")}>

                <PageIsPartOfContent
                  pageIsPartOf={pageIsPartOf}
                  intl={intl}
                ></PageIsPartOfContent>

              </div>
              {contentType === "information" && (
                <div className="coa-Page__side-content coa-Page__main-content-divider"></div>
              )}
            </div>
          </div>
        </div>

        <div className="coa-Page__side-content">
          <div className="coa-ServicePage__contacts-desktop"
            style={{
              "align-self": "flex-end",
            }}
          >

            <PageIsPartOfContent
              pageIsPartOf={pageIsPartOf}
              intl={intl}
            ></PageIsPartOfContent>

            {contentType === "information" && (
              <div className="coa-ServicePage__contacts-desktop-divider"></div>
            )}

          </div>
        </div>

      </div>

    </div>
  )
}

const PageIsPartOfContent = ({ pageIsPartOf, intl }) => {

  return (
    <div>

      <div className="coa-Tile--small-header">
        This page is a part of:
      </div>

      <div className="coa-TileGroup__tiles-container--compact">
        { pageIsPartOf.map( (page, index) => (
          <Tile
            url={
              page.guidePageUrl.substring(0, 4) === 'http'
              ? page.guidePageUrl
              : `/${intl.locale}${page.guidePageUrl}`
            }
            text={page.guidePageTitle}
            compact={true}
            key={index}
            pageType={page.ofPageType}
            isPageType={page.pageType}
          />
        ))}
      </div>

    </div>
  )
}


export default injectIntl(PageIsPartOfContainer);
