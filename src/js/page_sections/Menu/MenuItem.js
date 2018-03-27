import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'js/modules/I18nNavLink';
import Submenu from 'js/page_sections/Menu/Submenu';
import PlusSVG from 'js/svg/Plus';
import MinusSVG from 'js/svg/Minus';
import ChevronDownSVG from 'js/svg/ChevronDown';


const themeClassnames = (id, theme, openSubmenuId) => {
  const base = `coa-MenuItem`;
  const openModifier = openSubmenuId === id ?
    'coa-MenuItem--open' :
    '';

  return `${base} ${openModifier}`;
}

const MenuItem = ({theme, id, openSubmenuId, handleSubmenuToggle, handleMenuToggle}) => (
    <li key={id} className={themeClassnames(id, theme, openSubmenuId)}
      aria-expanded={openSubmenuId === id}
      aria-haspopup={true}
      aria-controls={`topicMenu${id+1}`}
      tabIndex={0}
      id={`theme${id+1}`}
      onClick={(e) => handleSubmenuToggle(e, id)}
      onKeyDown={(e) => handleSubmenuToggle(e, id)}
    >

      <MenuItemHeader
        id={id}
        theme={theme}
        openSubmenuId={openSubmenuId}
      />

      { !!theme.topics.edges && (
        <Submenu
          id={id}
          openSubmenuId={openSubmenuId}
          theme={theme}
          handleMenuToggle={handleMenuToggle}
        />
      )}
    </li>
);

const MenuItemHeader = ({ theme, id, openSubmenuId }) => (
  <div className="coa-MenuItem__header">
    <span className="coa-MenuItem__text">
      { theme.title }
    </span>
    <div className="coa-MenuItem__plus-sign d-lg-none">
      {
        openSubmenuId === id ?
          <MinusSVG size="18" title={`close ${theme.title} section`} /> :
          <PlusSVG size="18" title={`open ${theme.title} section`} />
      }
    </div>
    <div className="coa-MenuItem__arrow-down d-none d-lg-inline">
      <ChevronDownSVG size="14" />
    </div>
  </div>
)

export default MenuItem;
