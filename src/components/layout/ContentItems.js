import React, {Component} from 'react';
import WYSIWYG from 'components/modules/WYSIWYG';

class ContentItems extends Component {

  render() {

    const { contentItems } = this.props;

    return (contentItems) && (

      contentItems.map((content) => {

        {
          if (content.type === 'content') {
            return <div key={content.id}><WYSIWYG content={content.value} isSection={true} /></div>;
          }

          /* TODO: removed temporarily for user testing,
            uncomment as applications blocks are implemented.

          if (content.type === 'application_block') {
            return (
              <div key={content.id} className="coa-section">
                <h4>{content.value.description}</h4>
                INSERT {content.type} app HERE
                { content.value.url && <div dangerouslySetInnerHTML={{__html: content.value.url}} /> }
              </div>
            );
          }*/
        }

      })
    );
  }
}

export default ContentItems;
