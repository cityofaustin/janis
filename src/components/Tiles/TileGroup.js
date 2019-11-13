import React from 'react';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Tile from './Tile';

const TileGroup = ({ title, titleUrl, description, tiles, compact, intl }) => {
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
          {tiles.map(({ type, url, title, pageType }, index) => {
            return (
              <Tile
                url={
                  url.substring(0, 4) === 'http' ? url : `/${intl.locale}${url}`
                }
                text={title}
                compact={compact}
                pageType={pageType}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default injectIntl(TileGroup);
