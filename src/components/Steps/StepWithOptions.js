import React from 'react';
import PropTypes from 'prop-types';
import HtmlFromAdmin from 'components/HtmlFromAdmin';
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
          <HtmlFromAdmin content={option_description} />
        </span>
      </AccordionItemPanel>
    </AccordionItem>
  </div>
);

StepOption.propTypes = optionPropTypes;

const StepWithOptionsContent = props => (
  <div className="coa-StepOption__container">
    <HtmlFromAdmin content={props.description} />
    <Accordion className={'coa-Accordion testy'} allowMultipleExpanded={false}>
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
