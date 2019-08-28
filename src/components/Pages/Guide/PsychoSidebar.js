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

class PsychoSidebar extends Component {
  render() {
    let { contact, sections, currentSection } = this.props;

    return (
      <div className="coa-PsychoSidebar__container sticky">
        <Accordion className={'coa-GuideSidebar__mobile-accordian-container'} allowZeroExpanded={true}>
          <AccordionItem className={'coa-GuideSidebar__mobile-accordian-item '}>
            <AccordionItemPanel className={'coa-GuideSidebar__mobile-accordian-panel'}>
              BWAWHSFSHHAHAAHAHAHAHAHAH
            </AccordionItemPanel>
            <AccordionItemHeading className={'coa-GuideSidebar__mobile-accordian-heading'}>
              <AccordionItemButton className={'coa-GuideSidebar__mobile-accordian-button'}>
                <h3 className="coa-GuideSidebar__mobile-accordian-title">Table of Contents</h3>

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
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
}

export default PsychoSidebar;
