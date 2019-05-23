import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import I18nLink from 'components/I18n/I18nLink';
import ArrowRight from 'components/SVGs/ArrowRight';
import Tile from './Tile';

const TopServices = ({ tiles, title, url, locale, extraClasses }) =>
  !!tiles.length && (
    <div className={`coa-TopServices ${extraClasses ? extraClasses : ''}`}>
      <div className="coa-TopServices__container">
        <div className="wrapper container-fluid">
        {title && url && (
          <h4 className="coa-TopServices__title">
            <I18nLink to={url}>
              {title}&nbsp;
              <ArrowRight />
            </I18nLink>
          </h4>
        )}

        {title && !url && <h4 className="coa-TopServices__title">{title}</h4>}

        <div className="row">
          {tiles.map(({ type, value }, index) => {
            // If we don't have a value just use the whole tile
            // this fixes the homepage top services
            if (!value) {
              value = tiles[index];
            }

            // If our link type matches our locale, render it
            return type.substring(type.length - 2) === locale ? (
              <div
                key={index}
                className="coa-TileGroup__tile col-xs-12 col-md-6 col-lg-3"
              >
                <Tile
                  url={
                    value.url.substring(0, 4) === 'http'
                      ? value.url
                      : `/${locale}${value.url}`
                  }
                  text={value.title}
                />
              </div>
            ) : null;
          })}
        </div>
      </div>
      </div>
    </div>
  );

TopServices.propTypes = {
  title: PropTypes.string.isRequired,
  tiles: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
};

export default injectIntl(TopServices);
