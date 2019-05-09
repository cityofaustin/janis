import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WorkInProgress from 'components/WorkInProgress';
import I18nNavLink from 'components/I18n/I18nNavLink';
import ArrowRightSVG from 'components/SVGs/ArrowRight';

import SubmenuItem from './SubmenuItem';
import { themePropTypes } from './proptypes';

const Submenu = ({ id, theme, isSubmenuOpen, handleCloseAllMenus }) => {
  return (
    <ul
      className={classNames('coa-Submenu', {
        'coa-Submenu--open': isSubmenuOpen,
      })}
      id={`topicMenu${id + 1}`}
      role="menu"
      aria-labelledby={`theme${id + 1}`}
    >
      {theme.topics.map((topic, topicId) => {
        return (
          !!topic.services.length && (
            <SubmenuItem
              key={topicId}
              topic={topic}
              handleCloseAllMenus={handleCloseAllMenus}
            />
          )
        );
      })}
      <ThemeSubmenuItem
        theme={theme}
        handleCloseAllMenus={handleCloseAllMenus}
      />
      <WorkInProgressSubmenuItem />
    </ul>
  );
};

Submenu.propTypes = {
  handleCloseAllMenus: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isSubmenuOpen: PropTypes.bool.isRequired,
  theme: themePropTypes.isRequired,
};

const ThemeSubmenuItem = ({ theme, handleCloseAllMenus }) => (
  <li className="coa-SubmenuItem" role="menuitem" onClick={handleCloseAllMenus}>
    <I18nNavLink
      to={theme.url}
      className="coa-SubmenuItem__block coa-SubmenuItem__block--theme"
    >
      {theme.text}
      <ArrowRightSVG />
    </I18nNavLink>
  </li>
);

ThemeSubmenuItem.propTypes = {
  handleCloseAllMenus: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const WorkInProgressSubmenuItem = () => (
  <li className="coa-SubmenuItem">
    <span className="coa-SubmenuItem__block coa-SubmenuItem__block--wip">
      <WorkInProgress isClipped={true} />
    </span>
  </li>
);

WorkInProgressSubmenuItem.propTypes = {};

export default Submenu;
