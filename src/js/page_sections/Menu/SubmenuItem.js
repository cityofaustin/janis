import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'js/modules/I18nNavLink';

const SubmenuItem = ({ className, topic, handleToggleAllMenus }) => (
  <li onClick={handleToggleAllMenus} className="coa-SubmenuItem" role="menuitem">
    <I18nNavLink
      to={`/topics/${topic.slug}`}
      className={className}
    >
      {topic.text}
    </I18nNavLink>
  </li>
)

export default SubmenuItem;
