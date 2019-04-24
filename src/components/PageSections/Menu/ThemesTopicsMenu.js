import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const TopicsLinks = props => {
  if (props.topics.length > 0) {
    // return topics array pages/urls
    return (
      <ul className="coa-ThemesTopicsMenu__topics">
        {props.topics.map((topic, index) => (
          <li key={index} className="coa-ThemesTopicsMenu__topic">
            <a href={topic.url} className="coa-ThemesTopicsMenu__link">
              {topic.text}
            </a>
          </li>
        ))}
      </ul>
    );
  } else {
    // empty topics array, content coming soon
    return <p className="coa-FullSiteMenu__coming-soon">Coming soon</p>;
  }
};

const ThemesTopicsMenu = props => (
  <nav className="coa-ThemesTopicsMenu">
    <ul className="coa-ThemesTopicsMenu__list">
      {props.menu[props.intl.locale].map((theme, index) => (
        <li className="coa-ThemesTopicsMenu__section" key={index}>
          <h4 className="coa-ThemesTopicsMenu__theme">{theme.text}</h4>
          <TopicsLinks topics={theme.topics} />
        </li>
      ))}
    </ul>
  </nav>
);

TopicsLinks.propTypes = {
  topics: PropTypes.array.isRequired,
};

ThemesTopicsMenu.propTypes = {
  menu: PropTypes.object.isRequired,
};

export default injectIntl(ThemesTopicsMenu);
