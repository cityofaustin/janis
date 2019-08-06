import React from 'react';

import HtmlFromAdmin from 'components/HtmlFromAdmin';
import Steps from 'components/Steps';

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
          <a href={'blarg'}>
            View this page on alpha.austin.gov
            <i className="material-icons">open_in_new</i>
          </a>
        </div>
      </div>
    );
  }

  // TODO: handle steps
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
          <a href={'blarg'}>
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
