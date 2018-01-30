import React, {Component} from 'react';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';
import ApplicationBlock from 'js/page_sections/ApplicationBlock';

class ContentItems extends Component {

  render() {

    const { contentItems } = this.props;
    let JSX;

    if (!contentItems || !contentItems.length) {
      JSX = null;
    } else {
      JSX = contentItems.map((content) => {
        let JSXmap;
        if (content.type === 'content') {
          JSXmap = <HtmlFromAdmin content={content.value} />;
        } else {
          JSXmap = <ApplicationBlock type={content.type} data={content.value} />;
        }
        return <div key={content.id} className="coa-section">{JSXmap}</div>;
      });
    }

    return JSX;
  }
}

export default ContentItems;
