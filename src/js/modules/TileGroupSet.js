import React from 'react';
import PropTypes from 'prop-types';

import TileGroup from 'js/modules/TileGroup';


const TileGroupSet = ({ groups, tileKey, groupTitleSubPath }) =>  {

  // gets the number of topics that have active services
  const countOfGroups = groups.edges
    .map((g) => g.node.services.edges.length > 0)
    .reduce((total, amount) => amount ? total + 1 : total, 0);
  const shouldTilesStackVertical = countOfGroups > 1;

  return (
    <div className="coa-TileGroupSet row">
    {
      groups && groups.edges.map(({node: group}) => {
        if (group.services.edges.length < 1) return false;

        const tiles = group[tileKey].edges.map((tile) => ({
          url: `/${tileKey}/${tile.node.slug}`,
          text: tile.node.title,
        }));

        return (
          <TileGroup tiles={tiles}
            tag="service"
            hasBorder={true}
            title={group.text}
            key={group.id}
            titlePath={`/${groupTitleSubPath}/${group.slug}`}
            description={group.description}
            direction={shouldTilesStackVertical ? 'column' : false}
          />
        )
      })
    }
    </div>
  );
}

TileGroupSet.propTypes = {
  groups: PropTypes.object.isRequired,
  tileKey: PropTypes.string,
  groupTitleSubPath: PropTypes.string,
};

export default TileGroupSet;
