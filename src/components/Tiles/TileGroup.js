import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

import Tile from './Tile';
import { tileGroupPropTypes } from './proptypes';

const TileGroup = ({
  title,
  titleUrl,
  description,
  tiles,
  compact,
  allowEmptyTiles,
  intl,
}) => {
  return (
    (!!tiles.length || allowEmptyTiles) && (
      <div
        className={classNames('coa-TileGroup', {
          'coa-TileGroup--compact': compact,
        })}
      >
        <h4 className="coa-TileGroup__title">
          {titleUrl ? (
            <a
              href={
                titleUrl.substring(0, 4) === 'http'
                  ? titleUrl
                  : `/${intl.locale}${titleUrl}`
              }
            >
              {title}
            </a>
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
          {!!tiles.length &&
            tiles.map(({ url, title, pageType }, index) => {
              if (url === "/police-oversight/about-community-police-review-commission/") {
                url = "https://www.austintexas.gov/about-community-police-review-commission"
              }
              return (
                <Tile
                  url={
                    url.substring(0, 4) === 'http'
                      ? url
                      : `/${intl.locale}${url}`
                  }
                  text={title}
                  compact={compact}
                  key={index}
                  pageType={pageType}
                />
              );
            })}
        </div>
      </div>
    )
  );
};

TileGroup.propTypes = tileGroupPropTypes;

export default injectIntl(TileGroup);
