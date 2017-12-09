import React, {Component} from 'react';

class ContentItems extends Component {

  render() {

    const { contentItems } = this.props;

    return (contentItems) && (
      <div>
      {
        contentItems.map((content) => {
          if (content.type === 'application_block') {
            return (
              <div className="coa-section">
                <h4>{content.value.description}</h4>
                INSERT {content.type} app HERE
                { content.value.url && <div dangerouslySetInnerHTML={{__html: content.value.url}} /> }
              </div>
            );
          } else if (content.type === 'content') {
            return (
              <div className="coa-section" dangerouslySetInnerHTML={{__html: content.value}} />
            )
          }
        })
      }
      </div>
    );
  }
}

export default ContentItems;
