import React from 'react';
import PropTypes from 'prop-types';
import Parser, { domToReact } from 'html-react-parser';
import { optionPropTypes, stepWithOptionsPropTypes } from './proptypes';

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
        <span>
          {Parser(option_description, {
            replace: domNode => {
              // this initial if is needed to prevent undefined error
              if (domNode.attribs) {
                if (
                  domNode.attribs.hasOwnProperty('href') &&
                  // making a sorta safe assumption that buttons in the steps
                  // will always be part of a list (to prevent links elsewhere
                  // from being overwritten), but perhaps there is a better
                  // way to distinguish them
                  domNode.parent.name === 'li'
                ) {
                  // console.dir(domNode);
                  // replace the node with a button
                  return (
                    <nav class="usa-button-primary">
                      // this is kinda goofy, but the 'data' is the text of the link
                      // and html-parser reads that as a child of <a>
                      {domNode.children[0].data}
                    </nav>
                  );
                }
              }
            },
          })}
        </span>
      </AccordionItemPanel>
    </AccordionItem>
  </div>
);

StepOption.propTypes = optionPropTypes;

const StepWithOptionsContent = props => (
  <div className="coa-StepOption__container">
    <h1 className="coa-StepOption__title">{props.description}</h1>
    <Accordion className={'coa-Accordion'} allowMultipleExpanded={false}>
      {props.options.map(({ ...rest }, index) => (
        <StepOption key={index} {...rest} />
      ))}
    </Accordion>
  </div>
);

const StepWithOptions = ({ description, options, singleStep }) =>
  singleStep ? (
    <StepWithOptionsContent description={description} options={options} />
  ) : (
    <li className="coa-StepOption__item">
      <StepWithOptionsContent description={description} options={options} />
    </li>
  );

StepWithOptions.propTypes = stepWithOptionsPropTypes;

export default StepWithOptions;
