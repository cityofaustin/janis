import React, { Component } from 'react';
import SectionTitle from 'js/modules/SectionTitle';
import ListLink from 'js/modules/ListLink';

class RelatedLinks extends Component {

  render() {

    const { relatedlinks, sectionStyle, sectionTitle, sectionText, sectionLink } = this.props;
    let JSX;

    if (!relatedlinks || !relatedlinks.length) {
      JSX = null;
    } else {
      JSX = (
        <div className={`coa-section ${sectionStyle === 'primary' ? '' : 'coa-section--grey' }`}>
          <div className="wrapper">
          {
            sectionTitle && (
              <SectionTitle
                title={sectionTitle}
                noBorder={sectionStyle === 'primary' ? true : false}
              />
            )
          }
          {
            sectionText && (
              <p>{sectionText}</p>
            )
          }
            <div className="row">
            {
              relatedlinks.map((link, index) =>
                <div key={index} className="col-xs-12 col-md-6 col-lg-4">
                <ListLink
                  url={link.url}
                  text={link.text}
                  linkStyle={sectionStyle === 'primary' ? 'boxprimary' : 'box'}
                />
                </div>
              )
            }
            </div>

          { sectionLink && (
            <a className="coa-section__link" href={sectionLink.url}>{sectionLink.text}</a>
            )
          }
          </div>
        </div>
      );
    }

    return JSX;
  }
}

export default RelatedLinks;
