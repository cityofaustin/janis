import React, {Component} from 'react';
import HtmlFromAdmin from 'components/modules/HtmlFromAdmin';

class ContentItems extends Component {

  render() {

    const { contentItems } = this.props;

    return (contentItems) && (

      contentItems.map((content) => {

        let JSX;
        if (content.type === 'content') {
          JSX = <div key={content.id}><HtmlFromAdmin content={content.value} isSection={true} /></div>;
        }

        /* TODO: removed temporarily for user testing,
          uncomment as applications blocks are implemented.

        if (content.type === 'application_block') {
          JSX = (
            <div key={content.id} className="coa-section">
              <h4>{content.value.description}</h4>
              INSERT {content.type} app HERE
              { content.value.url && <div dangerouslySetInnerHTML={{__html: content.value.url}} /> }
            </div>
          );
        }*/

        return JSX;
      })
    );
  }
}

export default ContentItems;
