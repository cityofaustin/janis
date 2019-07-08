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

const StepOption = ({ option_name, option_description }) => (
  <div className="coa-StepOption">
    <AccordionItem className={'coa-AccordionItem'}>
      <AccordionItemHeading className={'coa-AccordionItemHeading'}>
        <AccordionItemButton className={'coa-AccordionButton'}>
          <h3 className="coa-StepOption__name">{option_name}</h3>

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
        <span>BLARG</span>
      </AccordionItemPanel>
    </AccordionItem>
  </div>
);

const TopicsLinks = props => {
  debugger;

  return props.topicCollections.length > 0 ? (
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
};

const ThemesTopicsMobileMenu = props => {
  debugger;

  return (
    <Accordion className={'coa-Accordion'} allowMultipleExpanded={false}>
      {props.menu.map((theme, index) => (
        <div className="coa-StepOption__container">
          <h1 className="coa-StepOption__title">{props.description}</h1>

          <StepOption key={index} topicCollections={theme.topicCollections} />
        </div>
      ))}
    </Accordion>
  );
};

TopicsLinks.propTypes = {
  topics: PropTypes.array.isRequired,
};

ThemesTopicsMobileMenu.propTypes = {
  menu: PropTypes.object.isRequired,
};

export default injectIntl(ThemesTopicsMobileMenu);
