import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import I18nLink from 'components/I18n/I18nLink';
import BadgeSVG from 'components/SVGs/Badge';

import { badgePropTypes } from './proptypes';

const Badge = ({ text, url, symbol, isActive }) => (
  <div
    className={classNames('coa-Badge', {
      'coa-Badge--isActive': isActive,
    })}
  >
    <BadgeSVG className="coa-Badge__background" />
    {!!symbol && <span className="coa-Badge__symbol">{symbol}</span>}
    {!!url && (
      <I18nLink className="coa-Badge__title" to={url}>
        {text}
      </I18nLink>
    )}
    {!url && <span className="coa-Badge__title">{text}</span>}
  </div>
);

Badge.propTypes = badgePropTypes;

export default Badge;
