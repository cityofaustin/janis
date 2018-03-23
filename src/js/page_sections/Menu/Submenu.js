import React from 'react';
import PropTypes from 'prop-types';

import SubmenuItem from 'js/page_sections/Menu/SubmenuItem';
import ExternalLink from 'js/modules/ExternalLink';
import I18nNavLink from 'js/modules/I18nNavLink';
import ArrowRightSVG from 'js/svg/ArrowRight';

const getSubmenuClassnames = (intl, id, openSection) => {
  const base = 'coa-Submenu';
  const shouldAlignRight = (intl.locale === 'ar' && id < 5) ||  (intl.locale !== 'ar' && id > 4);
  const alignRight = shouldAlignRight ? 'coa-Submenu--align-right' : '';
  const open = openSection === id ? 'coa-Submenu--open' : '';

  return `${base} ${alignRight} ${open}`;
}

const Submenu = ({id, openSection, theme, handleMenuToggle, intl}) => (
  <ul className={getSubmenuClassnames(intl, id, openSection)}
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
    <li key={id} className="coa-SubmenuItem coa-SubmenuItem--theme" role="menuitem">
      <I18nNavLink to={`/theme/${theme.slug}`}>
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
    Alpha.austin.gov is a work in progress. For the full City of Austin website, visit <ExternalLink to="http://austintexas.gov">austintexas.gov</ExternalLink>.
  </li>
)

export default Submenu;
