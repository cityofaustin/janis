import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'js/modules/I18nNavLink';


const SubmenuItem = ({ className, topic, handleClick }) => (
  <li onClick={handleClick} className="coa-SubmenuItem" role="menuitem">
    <I18nNavLink
      to={`/topics/${topic.slug}`}
      className={className}
    >
      {topic.title}
    </I18nNavLink>
  </li>
)

export default SubmenuItem;
