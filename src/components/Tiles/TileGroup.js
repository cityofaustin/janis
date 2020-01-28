import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Tile from './Tile';
import { tileGroupPropTypes } from './proptypes';

const TileGroup = ({ title, titleUrl, description, tiles, compact, intl }) => {
  // Ok, this one is kinda just a mess, we're using TileGroup in quite a few
  // different ways, so we have extra logic in here to make sure we actually
  // get the right URL regardless of if we're passing in an external link or
  // a internal one, and then, once again, adding the locale at the last minute.
  // Definitely a place that would need to change for localized slugs to work.

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
          {tiles.map(({ url, title, pageType }, index) => {
            return (
              <Tile
                url={
                  url.substring(0, 4) === 'http' ? url : `/${intl.locale}${url}`
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
