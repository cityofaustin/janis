import React from 'react';

const GuideSectionPage = ({ page }) => {
  if (page.informationPage) {
    return (
      <div>
        <div>INFO PAGE</div>
        <div>{JSON.stringify(page.informationPage)}</div>
      </div>
    );
  }

  if (page.servicePage) {
    return (
      <div>
        <div>SERVICE PAGE</div>
        <div>{JSON.stringify(page.servicePage)}</div>
      </div>
    );
  }
};

const GuideSection = ({ section }) => {
  return (
    <React.Fragment>
      <h1>{section.heading}</h1>
      {section.pages.map((page, index) => (
        <GuideSectionPage page={page} />
      ))}
    </React.Fragment>
  );
};

export default GuideSection;
