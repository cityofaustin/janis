import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'js/modules/I18nNavLink';


const SubmenuItem = ({ id, topic, handleClick }) => (
  <li key={id} onClick={handleClick} className="coa-SubmenuItem"
    role="menuitem"
  >
    <I18nNavLink to={`/topics/${topic.slug}`}
      activeClassName="usa-current"
      className="test"
      tabIndex={-1}
    >
      {topic.title}
    </I18nNavLink>
  </li>
)

export default SubmenuItem;
