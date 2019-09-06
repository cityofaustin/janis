import React from 'react';
import { injectIntl } from 'react-intl';

import Tile from './Tile';

const TileGroup = ({ title, description, locale, tiles }) => {
  debugger;

  return (
    !!tiles.length && (
      <div className="coa-TileGroup">
        <h4 className="coa-TileGroup__title">{title}</h4>
        {!!description && (
          <p className="coa-TileGroup__description">{description}</p>
        )}
        <div className="coa-TileGroup__tiles-container">
          {tiles.map(({ type, value }, index) => {
            // If our link type matches our locale, render it
            return type.substring(type.length - 2) === locale ? (
              <Tile
                url={
                  value.url.substring(0, 4) === 'http'
                    ? value.url
                    : `/${locale}${value.url}`
                }
                text={value.title}
              />
            ) : null;
          })}
        </div>
      </div>
    )
  );
};

export default injectIntl(TileGroup);
