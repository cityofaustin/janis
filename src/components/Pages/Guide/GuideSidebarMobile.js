import React, { Component } from 'react';
import classNames from 'classnames';
import {hyphenate} from "./helpers";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';

function GuideSidebarMobile({ contact, sections, currentSection }) {

  return (
    <Accordion className={'coa-GuideSidebar__mobile-accordian-container'} allowZeroExpanded={true}>
      <AccordionItem className={'coa-GuideSidebar__mobile-accordian-item'}>
        <AccordionItemPanel className={'coa-GuideSidebar__mobile-accordian-panel'}>
          BWAWHSFSHHAHAAHAHAHAHAHAH
        </AccordionItemPanel>
        <AccordionItemHeading className={'coa-GuideSidebar__mobile-accordian-heading'}>
          <AccordionItemButton className={'coa-GuideSidebar__mobile-accordian-button'}>
            Table of Contents
          </AccordionItemButton>
        </AccordionItemHeading>
      </AccordionItem>
    </Accordion>
  )
}

export default GuideSidebarMobile;
