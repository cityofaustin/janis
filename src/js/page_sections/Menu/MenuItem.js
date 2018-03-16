import React from 'react';
import PropTypes from 'prop-types';

import I18nNavLink from 'js/modules/I18nNavLink';
import Submenu from 'js/page_sections/Menu/Submenu';
import PlusSVG from 'js/svg/Plus';
import MinusSVG from 'js/svg/Minus';
import ChevronDownSVG from 'js/svg/ChevronDown';


const themeClassnames = (id, theme, openSection) => {
  const base = `coa-Menu__item`;
  const openModifier = openSection === id ?
    'coa-Menu__item--open' :
    '';
  const comingSoonModifier = theme.slug === 'false' ?
    'coa-Menu__item--coming-soon' :
    '';

  return `${base} ${openModifier} ${comingSoonModifier}`;
}

const MenuItem = ({theme, id, openSection, handleSublistToggle, handleMenuToggle}) => (
    <li key={id} className={themeClassnames(id, theme, openSection)}
      aria-expanded={openSection === id}
      aria-haspopup={true}
      aria-controls={`topicMenu${id+1}`}
      tabIndex={0}
      id={`theme${id+1}`}
      onClick={(e) => handleSublistToggle(e, id)}
      // onMouseOver={(e) => handleSublistToggle(e, id)}
      // onMouseOut={(e) => handleSublistToggle(e, id)}
      // TODO:
      // should onClick trigger sublist open on desktop as it does on mobile?
      // should onMouseOver/Out be disabled on mobile?
    >

      <MenuItemHeader id={id}
        theme={theme}
        openSection={openSection}
        handleClick={handleSublistToggle}
      />

      { !!theme.topics.edges && (
        <Submenu
          id={id}
          openSection={openSection}
          theme={theme}
          handleMenuToggle={handleMenuToggle}
        />
      )}
    </li>
);

const MenuItemHeader = ({ theme, e, id, openSection, handleClick }) => (
  <I18nNavLink to={`/theme/${theme.slug}`} key={id}
    activeClassName="usa-current"
    onClick={(e) => handleClick(e, id)}
  >
    <span className="coa-Menu__item-text">
      { theme.title }
    </span>
    <div className="coa-Menu__plus-sign d-lg-none">
      {
        openSection === id ?
          <MinusSVG size="18" title="close section"/> :
          <PlusSVG size="18" title="open section" />
      }
    </div>
    <div className="coa-Menu__arrow-down d-none d-lg-block">
      <ChevronDownSVG size="14" />
    </div>
  </I18nNavLink>
)


// MenuItem.propTypes = {
//   : PropTypes.
// };


export default MenuItem;
