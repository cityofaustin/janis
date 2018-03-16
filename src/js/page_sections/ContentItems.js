import React from 'react';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';
import ApplicationBlock from 'js/page_sections/ApplicationBlock';

const ContentItems = ({ contentItems }) => {
  if (!contentItems || !contentItems.length) return null;
  return contentItems.map((content) => {
    let JSX;
    if (content.type === 'content') {
      JSX = <HtmlFromAdmin content={content.value} />;
    } else {
      JSX = <ApplicationBlock type={content.type} data={content.value} />;
    }
    return <div key={content.id} className="coa-section">{JSX}</div>;
  });
}

export default ContentItems;
