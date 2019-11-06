import React from 'react';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Tile from './Tile';

const TileGroup = ({ title, titleUrl, description, tiles, compact, intl, content_type }) => {
  return (
    !!tiles.length && (
      <div
        className={classNames('coa-TileGroup', {
          'coa-TileGroup--compact': compact,
        })}
      >
        <h4 className="coa-TileGroup__title">
          {titleUrl ? (
            <Link
              to={
                titleUrl.substring(0, 4) === 'http'
                  ? titleUrl
                  : `/${intl.locale}${titleUrl}`
              }
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h4>
        {!!description && (
          <p className="coa-TileGroup__description">{description}</p>
        )}
        <div
          className={
            compact
              ? 'coa-TileGroup__tiles-container--compact'
              : 'coa-TileGroup__tiles-container'
          }
        >
          {tiles.map(({ type, url, title, __typename }, index) => (
            <Tile
              url={
                url.substring(0, 4) === 'http' ? url : `/${intl.locale}${url}`
              }
              text={title}
              compact={compact}
              __typename={__typename}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default injectIntl(TileGroup);
