import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'components/I18n/I18nNavLink';

const SubmenuItem = ({ className, topic, handleCloseAllMenus }) => (
  <li onClick={handleCloseAllMenus} className="coa-SubmenuItem" role="menuitem">
    <I18nNavLink to={topic.url} className={className}>
      {topic.text}
    </I18nNavLink>
  </li>
);

SubmenuItem.propTypes = {
  className: PropTypes.string,
  handleCloseAllMenus: PropTypes.func.isRequired,
  topic: PropTypes.shape({
    services: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubmenuItem;
