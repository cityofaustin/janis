import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { misc as i18n2 } from 'js/i18n/definitions';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';

const TopicsLinks = ({ theme, locale, intl }) => {
  const topicCollections = theme.topicCollectionPages.edges;

  return !!topicCollections && topicCollections.length > 0 ? (
    <ul className="coa-ThemesTopicsMenu__topics">
      {topicCollections.map((tc, index) => (
        <li key={index} className="coa-ThemesTopicsMenu__topic">
          <a
            href={`/${locale}${
              tc.node.slug ? `/${theme.slug}/${tc.node.slug}` : tc.node.url
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
};

const ThemeAccordianItem = ({ theme, locale, intl }) => (
  <AccordionItem className={'coa-ThemeAccordianItem'}>
    <AccordionItemHeading className={'coa-ThemeAccordionItemHeading'}>
      <AccordionItemButton className={'coa-ThemeAccordionButton'}>
        <p className="coa-ThemeAccordianItem__name">{theme.text}</p>

        <AccordionItemState>
          {({ expanded }) =>
            expanded ? (
              <i className="material-icons">expand_less</i>
            ) : (
              <i className="material-icons">expand_more</i>
            )
          }
        </AccordionItemState>
      </AccordionItemButton>
    </AccordionItemHeading>
    <AccordionItemPanel className={'coa-AccordionPanel'}>
      <TopicsLinks theme={theme} locale={locale} intl={intl} />
    </AccordionItemPanel>
  </AccordionItem>
);

const ThemesTopicsMobileMenu = props => (
  <Accordion
    className={'coa-Accordion'}
    allowMultipleExpanded={true}
    allowZeroExpanded={true}
  >
    {props.menu.map((theme, index) => (
      <div key={index} className="coa-ThemesTopicsMobileMenu__theme-container">
        <ThemeAccordianItem
          theme={theme}
          locale={props.intl.locale}
          intl={props.intl}
        />
      </div>
    ))}
  </Accordion>
);

ThemesTopicsMobileMenu.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default injectIntl(ThemesTopicsMobileMenu);
