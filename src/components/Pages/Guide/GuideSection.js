import React from 'react';

import HtmlFromAdmin from 'components/HtmlFromAdmin';
import Steps from 'components/Steps';
import {hyphenate} from "./helpers";

const GetUrlFromTopicsOrDepartments = ({ topics, departments, slug }) => {
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

const GuideSectionPage = ({
  page,
  pageNumber,
  numberOfPages,
  sectionHeading,
}) => {
  const pageData = page.informationPage || page.servicePage;
  const title = pageData.title;
  const description = (page.informationPage) ? pageData.description : pageData.shortDescription;
  const additionalContent = pageData.additionalContent;
  const topics = pageData.topics.edges;
  const departments = pageData.relatedDepartments.edges;
  const slug = pageData.slug;

  return (
    <div id={`${hyphenate(sectionHeading)}-${pageNumber}`} className="coa-GuideSectionPage">
      <div className="coa-GuideSectionPage__section-info">
        {`${sectionHeading} ${pageNumber} of ${numberOfPages}`}
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {page.servicePage && <Steps steps={pageData.steps} />}
      <HtmlFromAdmin
        title={' '}
        content={additionalContent}
      />
      <div className="coa-GuideSectionPage__link">
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
  );
};

const GuideSection = ({ section }) => (
  <React.Fragment>
    <h1 id={hyphenate(section.heading)}>{section.heading}</h1>
    {section.pages.map((page, index) => (
      <GuideSectionPage
        page={page}
        pageNumber={index + 1}
        numberOfPages={section.pages.length}
        sectionHeading={section.heading}
      />
    ))}
  </React.Fragment>
);

export default GuideSection;
