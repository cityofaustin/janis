import React from 'react';
import SectionHeader from 'js/modules/SectionHeader';
import Tile from 'js/modules/Tile';
import I18nLink from 'js/modules/I18nLink';

const RelatedLinks = ({ relatedLinks, title }) => {

  return (
      <div>
        <SectionHeader title={title} />
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
      </div>
  );
}

export default RelatedLinks;
