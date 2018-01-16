import React, {Component} from 'react';
import HtmlFromAdmin from 'js/modules/HtmlFromAdmin';

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
          JSXmap = <div key={content.id}><HtmlFromAdmin content={content.value} isSection={true} /></div>;
        }

        /* TODO: removed temporarily for user testing,
          uncomment as applications blocks are implemented.

        if (content.type === 'application_block') {
          JSXmap = (
            <div key={content.id} className="coa-section">
              <h4>{content.value.description}</h4>
              INSERT {content.type} app HERE
              { content.value.url && <div dangerouslySetInnerHTML={{__html: content.value.url}} /> }
            </div>
          );
        }*/

        return JSXmap;
      });
    }

    return JSX;
  }
}

export default ContentItems;
