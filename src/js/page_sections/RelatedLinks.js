import React from 'react';
import SectionHeader from 'js/modules/SectionHeader';
import TileGroup from 'js/modules/TileGroup';

const RelatedLinks = ({ relatedLinks, title }) => (
  <div className="coa-RelatedLinks">
    <SectionHeader title={title} />
    <TileGroup tiles={relatedLinks} />
  </div>
);

export default RelatedLinks;
