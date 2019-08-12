import React from 'react';

import HtmlFromAdmin from 'components/HtmlFromAdmin';
import Steps from 'components/Steps';

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
  if (page.informationPage) {
    return (
      <div className="coa-GuideSectionPage">
        <div className="coa-GuideSectionPage__section-info">
          {`${sectionHeading} ${pageNumber} of ${numberOfPages}`}
        </div>
        <h2>{page.informationPage.title}</h2>
        <p>{page.informationPage.description}</p>
        <HtmlFromAdmin
          title={' '}
          content={page.informationPage.additionalContent}
        />
        <div className="coa-GuideSectionPage__link">
          <a
            href={GetUrlFromTopicsOrDepartments({
              topics: page.informationPage.topics.edges,
              departments: page.informationPage.relatedDepartments.edges,
              slug: page.informationPage.slug,
            })}
          >
            View this page on alpha.austin.gov
            <i className="material-icons">open_in_new</i>
          </a>
        </div>
      </div>
    );
  }

  if (page.servicePage) {
    return (
      <div className="coa-GuideSectionPage">
        <div className="coa-GuideSectionPage__section-info">
          {`${sectionHeading} ${pageNumber} of ${numberOfPages}`}
        </div>
        <h2>{page.servicePage.title}</h2>
        <p>{page.servicePage.shortDescription}</p>
        <Steps steps={page.servicePage.steps} />
        <HtmlFromAdmin
          title={' '}
          content={page.servicePage.additionalContent}
        />
        <div className="coa-GuideSectionPage__link">
          <a
            href={GetUrlFromTopicsOrDepartments({
              topics: page.servicePage.topics.edges,
              departments: page.servicePage.relatedDepartments.edges,
              slug: page.servicePage.slug,
            })}
          >
            View this page on alpha.austin.gov
            <i className="material-icons">open_in_new</i>
          </a>
        </div>
      </div>
    );
  }
};

const GuideSection = ({ section }) => (
  <React.Fragment>
    <h1>{section.heading}</h1>
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
