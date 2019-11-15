import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { misc as i18n2 } from 'js/i18n/definitions';

const TopicsLinks = props =>
  props.topicCollections.length > 0 ? (
    <ul className="coa-ThemesTopicsMenu__topics">
      {props.topicCollections.map((tc, index) => (
        <li
          key={index}
          className="coa-ThemesTopicsMenu__topic"
          onKeyDown={props.handleFullSiteMenuItem}
        >
          <a
            href={`/${props.intl.locale}${
              tc.node.slug ? `/${props.themeSlug}/${tc.node.slug}` : tc.node.url
            }`}
            className="coa-ThemesTopicsMenu__link"
          >
            {tc.node.title}
          </a>
        </li>
      ))}
    </ul>
  ) : (
    <p className="coa-FullSiteMenu__coming-soon">
      {props.intl.formatMessage(i18n2.comingSoon)}
    </p>
  );

const ThemesTopicsMenu = props => {
  return (
    <nav
      className={`coa-ThemesTopicsMenu ${
        props.extraClasses ? props.extraClasses : ''
      }`}
    >
      <ul className="coa-ThemesTopicsMenu__list">
        {props.menu.map((theme, index) => (
          <li className="coa-ThemesTopicsMenu__section" key={index}>
            <h4
              className="coa-ThemesTopicsMenu__theme"
              tabIndex="0"
              onKeyDown={props.handleFullSiteMenuItem}
            >
              {theme.text}
            </h4>
            <TopicsLinks
              handleFullSiteMenuItem={props.handleFullSiteMenuItem}
              topicCollections={theme.topicCollectionPages.edges}
              themeSlug={theme.slug}
              intl={props.intl}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

TopicsLinks.propTypes = {
  themeSlug: PropTypes.string.isRequired,
  topicCollections: PropTypes.array,
  handleFullSiteMenuItem: PropTypes.func,
};

ThemesTopicsMenu.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default injectIntl(ThemesTopicsMenu);
