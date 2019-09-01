import React, {Component} from 'react';

import GuideSectionWrapper from 'components/Pages/Guide/GuideSectionWrapper';
import HtmlFromAdmin from 'components/HtmlFromAdmin';
import Steps from 'components/Steps';
import {hyphenate} from "./helpers";

function GetUrlFromTopicsOrDepartments({ topics, departments, slug }){
  // Just use the first topic if we've got one
  if (topics.length) {
    const topic = topics[0].node.topic;
    const topicCollection =
      topic.topiccollections.edges[0].node.topiccollection;

    return `/${topicCollection.theme.slug}/${topicCollection.slug}/${
      topic.slug
    }/${slug}/`;
  }

  // Fine, then I guess just use the first department if we've got one
  if (departments.length) {
    const department = departments[0].node.relatedDepartment;

    return `/${department.slug}/${slug}/`;
  }

  // This should make it so broken links don't break the build,
  // and instead just keep us on the guide page
  return '';
};

function GuideSection({
  page,
  pageNumber,
  numberOfPages,
  sectionHeading,
}) {
  const pageData = page.informationPage || page.servicePage;
  const title = pageData.title;
  const description = (page.informationPage) ? pageData.description : pageData.shortDescription;
  const additionalContent = pageData.additionalContent;
  const topics = pageData.topics.edges;
  const departments = pageData.relatedDepartments.edges;
  const slug = pageData.slug;

  return (
    <div className="coa-GuideSection">
      <div className="coa-GuideSection__block">
        <div className="coa-GuideSection__content">
          <div className="coa-GuideSection__page-number">
            {`${sectionHeading} ${pageNumber} of ${numberOfPages}`}
          </div>
          <h2>{title}</h2>
          <p>{description}</p>
          {page.servicePage && <Steps steps={pageData.steps} />}
          <HtmlFromAdmin
            title={' '}
            content={additionalContent}
          />
        </div>
      </div>
      <div className="coa-GuideSection__block">
        <div className="coa-GuideSection__link">
          <a
            href={GetUrlFromTopicsOrDepartments({
              topics,
              departments,
              slug,
            })}
          >
            View this page on alpha.austin.gov
            <i className="material-icons">open_in_new</i>
          </a>
        </div>
      </div>
    </div>
  );
};

function GuideSectionCollection({
  section,
  updateSectionLocation,
  isMobileOrTablet,
  resizeCount,
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
          anchorTag={`${hyphenate(section.heading)}-${index+1}`}
          updateSectionLocation={updateSectionLocation}
          isMobileOrTablet={isMobileOrTablet}
          resizeCount={resizeCount}
        >
          <GuideSection
            page={page}
            pageNumber={index + 1}
            numberOfPages={section.pages.length}
            sectionHeading={section.heading}
          />
        </GuideSectionWrapper>
      ))}
    </div>
  )
};

export default GuideSectionCollection;
