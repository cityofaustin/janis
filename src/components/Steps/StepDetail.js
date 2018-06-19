import React from 'react';
import PropTypes from 'prop-types';

import I18nLink from 'components/I18n/I18nLink';

import { stepDetailPropTypes } from './proptypes';

const StepDetail = ({ title, content, link }) => (
  <div className="coa-StepDetail">
    <h3 className="coa-StepDetail__title">{title}</h3>
    <div
      className="coa-StepDetail__content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
    {!!link && (
      <I18nLink className="coa-StepDetail__link usa-button" to={link.url}>
        {link.text}
      </I18nLink>
    )}
  </div>
);

StepDetail.propTypes = stepDetailPropTypes;

export default StepDetail;
