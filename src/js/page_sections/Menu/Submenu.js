import React from 'react';
import PropTypes from 'prop-types';

import SubmenuItem from 'js/page_sections/Menu/SubmenuItem';
import ExternalLink from 'js/modules/ExternalLink';
import I18nNavLink from 'js/modules/I18nNavLink';
import ArrowRightSVG from 'js/svg/ArrowRight';

const Submenu = ({id, openSection, theme, handleMenuToggle}) => (
  <ul className={`coa-Submenu
      ${ id > 4 ? `coa-Submenu--align-right` : '' }
      ${ openSection === id ? 'coa-Submenu--open' : '' }
    `}
    id={`topicMenu${id+1}`}
    role="menu"
    aria-labelledby={`theme${id+1}`}
  >
  {
    theme.topics.edges.map(({ node: topic }, topicId) => {
      return topic.slug !== "false" && (
        <SubmenuItem
          key={topicId}
          topic={topic}
          handleClick={handleMenuToggle}
        />
      );
    })
  }
    <li key={id} className="coa-SubmenuItem coa-SubmenuItem--theme"
      role="menuitem"
    >
      <I18nNavLink to={`/theme/${theme.slug}`}
        tabIndex={-1}
      >
        {theme.title}
        <span className="coa-SubmenuItem__arrow-right">
          <ArrowRightSVG size="13" />
        </span>
      </I18nNavLink>
    </li>
    <WorkInProgressSubitem />
  </ul>
);

// MenuItem.propTypes = {
//   : PropTypes.
// };

const WorkInProgressSubitem = () => (
  <li className="coa-SubmenuItem coa-SubmenuItem--coming-soon-message">
    <a href="https://www.austintexas.gov">
      Alpha.austin.gov is a work in progress. For the full City of Austin website, visit austintexas.gov.
    </a>
  </li>
)

export default Submenu;
