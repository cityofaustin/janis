import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { find } from 'lodash';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';

import SubmenuItem from 'components/PageSections/Menu/SubmenuItem';
import ExternalLink from 'components/ExternalLink';
import I18nNavLink from 'components/I18nLinks/I18nNavLink';
import ArrowRightSVG from 'js/svg/ArrowRight';

const SUBMENU_THRESHOLD_ALIGNRIGHT_RTL = 5;
const SUBMENU_THRESHOLD_ALIGNRIGHT_LTR = 4;

const isAlignedRight = (direction, id) => {
  return (direction === 'rtl') ? id < SUBMENU_THRESHOLD_ALIGNRIGHT_RTL : id > SUBMENU_THRESHOLD_ALIGNRIGHT_LTR;
};

const Submenu = ({id, theme, isSubmenuOpen, handleCloseAllMenus, intl}) => {

  const langObj = find(SUPPORTED_LANGUAGES, {'code': intl.locale});
  return (
    <ul className={`coa-Submenu
      ${isAlignedRight(langObj.direction, id) ? 'coa-Submenu--align-right' : ''}
      ${isSubmenuOpen ? 'coa-Submenu--open' : ''}`
    }
      id={`topicMenu${id+1}`}
      role="menu"
      aria-labelledby={`theme${id+1}`}
    >
    {
      theme.topics.edges.map(({ node: topic }, topicId) => {
        return !!topic.services.edges.length && (
          <SubmenuItem
            key={topicId}
            className="coa-SubmenuItem__block coa-SubmenuItem__block--link"
            topic={topic}
            handleCloseAllMenus={handleCloseAllMenus}
          />
        );
      })
    }
      <ThemeSubmenuItem theme={theme} handleCloseAllMenus={handleCloseAllMenus}/>
      <WorkInProgressSubmenuItem />
    </ul>
  );
}

const ThemeSubmenuItem = ({theme, handleCloseAllMenus}) => (
  <li className="coa-SubmenuItem"
    role="menuitem"
    onClick={handleCloseAllMenus}
  >
    <I18nNavLink
      to={`/themes/${theme.slug}`}
      className="coa-SubmenuItem__block coa-SubmenuItem__block--theme"
    >
      {theme.text}
      <ArrowRightSVG />
    </I18nNavLink>
  </li>
)

const WorkInProgressSubmenuItem = () => (
  <li className="coa-SubmenuItem">
    <span className="coa-SubmenuItem__block coa-SubmenuItem__block--wip">
    <FormattedMessage
      id="Submenu.workInProgress"
      defaultMessage="Alpha.austin.gov is a work in progress. For the full City of Austin website, visit {citySiteLink}."
      values={{
        citySiteLink: <ExternalLink to="http://austintexas.gov">austintexas.gov</ExternalLink>
      }}
    />
    </span>
  </li>
)

export default injectIntl(Submenu);
