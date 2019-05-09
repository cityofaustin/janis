import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { misc as i18n2 } from 'js/i18n/definitions';
import { useSiteData } from 'react-static';

const TopicsLinks = ({ topicCollections, themeSlug, intl }) =>
  topicCollections.length > 0 ? (
    <ul className="coa-ThemesTopicsMenu__topics">
      {topicCollections.map((tc, index) => (
        <li key={index} className="coa-ThemesTopicsMenu__topic">
          <a
            href={`/${intl.locale}${
              tc.node.slug ? `/${themeSlug}/${tc.node.slug}` : tc.node.url
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
      {intl.formatMessage(i18n2.comingSoon)}
    </p>
  );

const ThemesTopicsMenu = ({ intl }) => {
  const { navigation } = useSiteData();

  return (
    <nav className="coa-ThemesTopicsMenu">
      <ul className="coa-ThemesTopicsMenu__list">
        {navigation[intl.locale].map((theme, index) => (
          <li className="coa-ThemesTopicsMenu__section" key={index}>
            <h4 className="coa-ThemesTopicsMenu__theme">{theme.text}</h4>
            <TopicsLinks
              topicCollections={theme.topicCollectionPages.edges}
              themeSlug={theme.slug}
              intl={intl}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default injectIntl(ThemesTopicsMenu);
