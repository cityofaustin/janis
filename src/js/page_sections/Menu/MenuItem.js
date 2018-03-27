import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'js/modules/I18nNavLink';
import Submenu from 'js/page_sections/Menu/Submenu';
import PlusSVG from 'js/svg/Plus';
import MinusSVG from 'js/svg/Minus';
import ChevronDownSVG from 'js/svg/ChevronDown';


const isSubmenuOpen = (id, openSubmenuId) => (
  openSubmenuId === id
)

const MenuItem = ({theme, id, openSubmenuId, handleSubmenuToggle, handleMenuToggle}) => (
    <li key={id} className={`coa-MenuItem ${isSubmenuOpen(id, openSubmenuId) ? 'coa-MenuItem--open' : ''}`}
      aria-expanded={isSubmenuOpen(id, openSubmenuId)}
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
        isSubmenuOpen(id, openSubmenuId) ?
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
