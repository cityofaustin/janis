import React from 'react';
import PropTypes from 'prop-types';

import TileGroup from 'js/modules/TileGroup';

const TileGroupSet = ({ groups, tileKey, groupTitleSubPath }) => (
  <div className="coa-TileGroupSet">
  {
    groups && groups.edges.map(({node: group}, i) => {
      if (group.services.edges.length < 1) return false;

      const tiles = group[tileKey].edges.map((tile) => ({
        url: `/${tileKey}/${tile.node.slug}`,
        text: tile.node.title,
      }));

      return (
        <div key={i}>
          <TileGroup tiles={tiles}
            tag="service"
            border={true}
            title={group.text}
            titlePath={`/${groupTitleSubPath}/${group.slug}`}
            description={group.description}
          />
        </div>
      )
    })
  }
  </div>
);

TileGroupSet.propTypes = {
  groups: PropTypes.object.isRequired,
  tileKey: PropTypes.string,
  groupTitleSubPath: PropTypes.string,
};

export default TileGroupSet;
