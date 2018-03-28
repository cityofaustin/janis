import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'js/modules/I18nNavLink';
import Submenu from 'js/page_sections/Menu/Submenu';
import PlusSVG from 'js/svg/Plus';
import MinusSVG from 'js/svg/Minus';
import ChevronDownSVG from 'js/svg/ChevronDown';

const MenuItem = ({theme, id, isSubmenuOpen, handleSubmenuToggle, handleToggleAllMenus}) => (
  <li>
    <div className={`coa-MenuItem coa-MenuItem--flex ${isSubmenuOpen ? 'coa-MenuItem--open' : ''}`}
      id={`theme${id+1}`}
      aria-expanded={isSubmenuOpen}
      aria-haspopup={true}
      aria-controls={`topicMenu${id+1}`}
      tabIndex={0}
      onClick={(e) => handleSubmenuToggle(e, id)}
      onKeyDown={(e) => handleSubmenuToggle(e, id)}
    >
      <span className="coa-MenuItem__text">{ theme.title }</span>
      <div className="coa-MenuItem__plus-sign d-lg-none">
        {
          isSubmenuOpen
            ? <MinusSVG size="18" title={`close ${theme.title} section`} />
            : <PlusSVG size="18" title={`open ${theme.title} section`} />
        }
      </div>
      <div className="coa-MenuItem__arrow-down d-none d-lg-inline">
        <ChevronDownSVG size="14" />
      </div>
    </div>
  { !!theme.topics.edges && (
    <Submenu
      id={id}
      theme={theme}
      isSubmenuOpen={isSubmenuOpen}
      handleToggleAllMenus={handleToggleAllMenus}
    />
  )}
  </li>
);

export default MenuItem;
