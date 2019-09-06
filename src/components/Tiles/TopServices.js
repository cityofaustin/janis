import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import TileGroup from './TileGroup';

const TopServices = ({ tiles, title, url, locale, extraClasses }) => {
  return <TileGroup title={title} locale={locale} tiles={tiles} />;
};
TopServices.propTypes = {
  title: PropTypes.string.isRequired,
  tiles: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
};

export default injectIntl(TopServices);
