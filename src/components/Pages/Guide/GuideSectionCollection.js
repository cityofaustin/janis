import React, { Component } from 'react';

import GuideSectionWrapper from 'components/Pages/Guide/GuideSectionWrapper';
import HtmlFromAdmin from 'components/HtmlFromAdmin';
import Steps from 'components/Steps';
import { hyphenate } from './helpers';

import { guides as i18n } from 'js/i18n/definitions';

function GuideSection({
  page,
  pageNumber,
  numberOfPages,
  sectionHeading,
  intl,
}) {
  const url = page.url;
  const pageData = page.informationPage || page.servicePage;
  const title = pageData.title;
  const description = page.informationPage
    ? pageData.description
    : pageData.shortDescription;
  const additionalContent = pageData.additionalContent;

  return (
    <div className="coa-GuideSection__container">
      <div className="coa-GuideSection__content">
        <div className="coa-GuideSection__page-number">
          {`${sectionHeading} ${pageNumber} of ${numberOfPages}`}
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        {page.servicePage && <Steps steps={pageData.steps} />}
        <HtmlFromAdmin title={' '} content={additionalContent} />
      </div>
      <div className="coa-GuideSection__link">
        <a href={url} target="_blank">
          {intl.formatMessage(i18n.pageLink)}
          <i className="material-icons">open_in_new</i>
        </a>
      </div>
    </div>
  );
}

function GuideSectionCollection({
  section,
  updateSectionLocation,
  isMobileOrTablet,
  resizeCount,
  intl,
}) {
  return (
    <div className="coa-GuideSection__collection">
      <GuideSectionWrapper
        anchorTag={hyphenate(section.heading)}
        updateSectionLocation={updateSectionLocation}
        isMobileOrTablet={isMobileOrTablet}
        resizeCount={resizeCount}
      >
        <h1 className="coa-GuideSection__header">{section.heading}</h1>
      </GuideSectionWrapper>
      {section.pages.map((page, index) => (
        <GuideSectionWrapper
          key={index}
          anchorTag={`${hyphenate(section.heading)}-${index + 1}`}
          updateSectionLocation={updateSectionLocation}
          isMobileOrTablet={isMobileOrTablet}
          resizeCount={resizeCount}
        >
          {(page.servicePage || page.informationPage) && (
            <GuideSection
              page={page}
              pageNumber={index + 1}
              numberOfPages={section.pages.length}
              sectionHeading={section.heading}
              intl={intl}
            />
          )}
        </GuideSectionWrapper>
      ))}
    </div>
  );
}

export default GuideSectionCollection;
