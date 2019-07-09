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

const TopicsLinks = ({ theme, locale }) => {
  const topicCollections = theme.topicCollectionPages.edges;
  // debugger;

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
    <p className="coa-FullSiteMenu__coming-soon">SOON</p>
  );
};

const ThemeAccordianItem = ({ theme, locale }) => {
  // debugger;

  return (
    <AccordionItem className={'coa-ThemeAccordianItem'}>
      <AccordionItemHeading className={'coa-AccordionItemHeading'}>
        <AccordionItemButton className={'coa-AccordionButton'}>
          <p className="coa-ThemeAccordianItem__name">{theme.text}</p>

          <AccordionItemState>
            {({ expanded }) =>
              expanded ? (
                <i class="material-icons">remove</i>
              ) : (
                <i class="material-icons">add</i>
              )
            }
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className={'coa-AccordionPanel'}>
        <TopicsLinks theme={theme} locale={locale} />
      </AccordionItemPanel>
    </AccordionItem>
  );
};

const ThemesTopicsMobileMenu = props => {
  // debugger;

  return (
    <Accordion className={'coa-Accordion'} allowMultipleExpanded={true}>
      {props.menu.map((theme, index) => (
        <div className="coa-ThemesTopicsMobileMenu__theme-container">
          <ThemeAccordianItem theme={theme} locale={props.intl.locale} />
        </div>
      ))}
    </Accordion>
  );
};

ThemesTopicsMobileMenu.propTypes = {
  menu: PropTypes.object.isRequired,
};

export default injectIntl(ThemesTopicsMobileMenu);
