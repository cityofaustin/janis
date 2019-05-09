import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import StepDetail from './StepDetail';
import { stepDetailGroupPropTypes } from './proptypes';

const StepDetailGroup = ({ steps, stepClassName }) => (
  <div className="coa-StepDetailGroup">
    {steps.map(({ ...rest }, index) => (
      <div
        key={index}
        className={classNames('coa-StepDetailGroup__item', {
          'coa-StepDetailGroup__item--stripe': index % 2 == 0,
        })}
      >
        <div className={classNames('container-fluid wrapper', stepClassName)}>
          <StepDetail {...rest} />
        </div>
      </div>
    ))}
  </div>
);

StepDetailGroup.propTypes = stepDetailGroupPropTypes;

export default StepDetailGroup;
