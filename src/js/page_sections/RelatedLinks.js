import React from 'react';
import SectionTitle from 'js/modules/SectionTitle';
import Tile from 'js/modules/Tile';
import I18nLink from 'js/modules/I18nLink';

const RelatedLinks = ({ relatedLinks, style, sectionTitle, sectionText, sectionLink }) => {

  if (!relatedLinks || !relatedLinks.length) return null;

  return (
    <div className={`coa-section ${style === 'primary' ? '' : 'coa-section--grey' }`}>
      <div className="container-fluid wrapper">
      {
        sectionTitle && <SectionTitle title={sectionTitle} />
      }
      {
        sectionText && <p>{sectionText}</p>
      }
        <div className="row">
        {
          relatedLinks.map((link, index) =>
            <div key={index} className="col-xs-12 col-md-6 col-lg-3">
              <Tile
                url={link.url}
                text={link.text}
                tag="Service"
              />
            </div>
          )
        }
        </div>
      {
        sectionLink && (
          <I18nLink
            className="coa-section__link"
            to={sectionLink.url}
          >{sectionLink.text}</I18nLink>
        )
      }
      </div>
    </div>
  );
}

export default RelatedLinks;
