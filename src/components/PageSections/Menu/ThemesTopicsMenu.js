import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const TopicsLinks = props =>
  props.topicCollections.length > 0 ? (
    <ul className="coa-ThemesTopicsMenu__topics">
      {props.topicCollections.map((tc, index) => (
        <li key={index} className="coa-ThemesTopicsMenu__topic">
          <a
            href={
              tc.node.slug ? `/${props.themeSlug}/${tc.node.slug}` : tc.node.url
            }
            className="coa-ThemesTopicsMenu__link"
          >
            {tc.node.title}
          </a>
        </li>
      ))}
    </ul>
  ) : (
    <p className="coa-FullSiteMenu__coming-soon">Coming soon</p>
  );

const ThemesTopicsMenu = props => {
  return (
    <nav className="coa-ThemesTopicsMenu">
      <ul className="coa-ThemesTopicsMenu__list">
        {props.menu.map((theme, index) => (
          <li className="coa-ThemesTopicsMenu__section" key={index}>
            <h4 className="coa-ThemesTopicsMenu__theme">{theme.text}</h4>
            <TopicsLinks
              topicCollections={theme.topicCollectionPages.edges}
              themeSlug={theme.slug}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

TopicsLinks.propTypes = {
  topics: PropTypes.array.isRequired,
};

ThemesTopicsMenu.propTypes = {
  menu: PropTypes.object.isRequired,
};

export default injectIntl(ThemesTopicsMenu);
