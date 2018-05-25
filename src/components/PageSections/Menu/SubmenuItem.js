import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'components/I18n/I18nNavLink';

import { topicPropTypes } from './proptypes';

const SubmenuItem = ({ topic, handleCloseAllMenus }) => (
  <li onClick={handleCloseAllMenus} className="coa-SubmenuItem" role="menuitem">
    <I18nNavLink
      to={topic.url}
      className="coa-SubmenuItem__block coa-SubmenuItem__block--link"
    >
      {topic.text}
    </I18nNavLink>
  </li>
);

SubmenuItem.propTypes = {
  handleCloseAllMenus: PropTypes.func.isRequired,
  topic: topicPropTypes.isRequired,
};

export default SubmenuItem;
