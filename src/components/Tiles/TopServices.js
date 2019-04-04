import React from 'react';
// import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { services as i18n3 } from 'js/i18n/definitions';
import I18nLink from 'components/I18n/I18nLink';
import ArrowRight from 'components/SVGs/ArrowRight';

import Tile from './Tile';
import { tileGroupPropTypes } from './proptypes';

const TopServices = ({ tiles, text, url, description, intl, locale }) => (
  <div className="coa-TopServices">
    <div className="wrapper container-fluid">
      {text &&
        url && (
          <h4 className="coa-TopServices__title">
            <I18nLink to={url}>
              {text}&nbsp;<ArrowRight />
            </I18nLink>
          </h4>
        )}

      {text && !url && <h4 className="coa-TopServices__title">{text}</h4>}

      <div className="row">
        {tiles.map(
          ({ type, value }, index) =>
            // If our link type matches our locale, render it
            type.substring(type.length - 2) === locale ? (
              <div
                key={index}
                className="coa-TileGroup__tile col-xs-12 col-md-6 col-lg-3"
              >
                <Tile url={value.url} text={value.title} />
              </div>
            ) : null,
        )}
      </div>
    </div>
  </div>
);

// TopServices.propTypes = tileGroupPropTypes;

export default injectIntl(TopServices);
