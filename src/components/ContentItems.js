import React, {Component} from 'react';

class ContentItems extends Component {

  render() {

    const { contentItems } = this.props;

    return (contentItems) && (

      contentItems.map((content) =>
        <div key={content.id}>
          {(content.type === 'application_block') && (
            <div className="coa-section">
              <h4>{content.value.description}</h4>
              INSERT {content.type} app HERE
              { content.value.url && <div dangerouslySetInnerHTML={{__html: content.value.url}} /> }
            </div>
          )}
          {(content.type === 'content') && (
            <div className="coa-section" dangerouslySetInnerHTML={{__html: content.value}} />
          )}
        </div>
      )
    );
  }
}

export default ContentItems;
