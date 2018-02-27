import React from 'react';
import SectionTitle from 'js/modules/SectionTitle';
import Tile from 'js/modules/Tile';
import { Link } from 'react-static';

const RelatedLinks = ({ relatedLinks, style, sectionTitle, sectionText, sectionLink }) => {
  let JSX;

  if (!relatedLinks || !relatedLinks.length) {
    JSX = null;
  } else {
    JSX = (
      <div className={`coa-section ${style === 'primary' ? '' : 'coa-section--grey' }`}>
        <div className="wrapper">
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

        { sectionLink && (
            <Link
              className="coa-section__link"
              to={sectionLink.url}
            >{sectionLink.text}</Link>
          )
        }
        </div>
      </div>
    );
  }

  return JSX;
}

export default RelatedLinks;
