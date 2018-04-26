import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'components/I18nLinks/I18nNavLink';
import Submenu from 'components/PageSections/Menu/Submenu';
import PlusSVG from 'components/SVGs/Plus';
import MinusSVG from 'components/SVGs/Minus';
import ChevronDownSVG from 'components/SVGs/ChevronDown';

const MenuItem = ({
  theme,
  id,
  isSubmenuOpen,
  handleSubmenuToggle,
  handleCloseAllMenus,
}) => (
  <li>
    <div
      className={`coa-MenuItem coa-MenuItem--flex ${
        isSubmenuOpen ? 'coa-MenuItem--open' : ''
      }`}
      id={`theme${id + 1}`}
      aria-expanded={isSubmenuOpen}
      aria-haspopup={true}
      aria-controls={`topicMenu${id + 1}`}
      tabIndex={0}
      onClick={e => handleSubmenuToggle(e, id)}
      onKeyDown={e => handleSubmenuToggle(e, id)}
    >
      <span className="coa-MenuItem__text">{theme.text}</span>
      <div className="d-lg-none">
        {isSubmenuOpen ? (
          <MinusSVG title={`close ${theme.text} section`} />
        ) : (
          <PlusSVG title={`open ${theme.text} section`} />
        )}
      </div>
      <div className="d-none d-lg-inline">
        <ChevronDownSVG />
      </div>
    </div>
    {!!theme.topics.edges && (
      <Submenu
        id={id}
        theme={theme}
        isSubmenuOpen={isSubmenuOpen}
        handleCloseAllMenus={handleCloseAllMenus}
      />
    )}
  </li>
);

export default MenuItem;
