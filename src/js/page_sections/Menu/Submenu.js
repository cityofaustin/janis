import React from 'react';
import PropTypes from 'prop-types';

import SubmenuItem from 'js/page_sections/Menu/SubmenuItem';


const Submenu = ({id, openSection, theme, handleMenuToggle}) => (
  <ul className={`coa-Menu__sublist
      ${ id > 4 ? `coa-Menu__sublist--align-right` : '' }
      ${ openSection === id ? 'coa-Menu__sublist--open' : '' }
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
    <WorkInProgressSubitem />
  </ul>
);

// MenuItem.propTypes = {
//   : PropTypes.
// };

const WorkInProgressSubitem = () => (
  <li className="coa-Menu__subitem coa-Menu__subitem--coming-soon-message">
    <a href="https://www.austintexas.gov">
      Alpha.austin.gov is a work in progress. For the full City of Austin website, visit austintexas.gov.
    </a>
  </li>
)

export default Submenu;
