import React from 'react';
import { injectIntl } from 'react-intl';

const ContextualNav = () => (
  <div className="coa-ContextualNav">
    <div className="wrapper container-fluid">
      <div className="coa-ContextualNav__container">
        <div className="coa-ContextualNav__parent">
          <a className="coa-ContextualNav__arrow">
            <i className="material-icons">arrow_back</i>
            <span>Parent Topic/Theme</span>
          </a>
        </div>
        <div className="coa-ContextualNav__related">
          <span className="coa-ContextualNav__label">Related to: </span>
          <a>Topics</a>
        </div>
        <div className="coa-ContextualNav__dept">
          <span className="coa-ContextualNav__label">Offered by: </span>
          <a>Dept</a>
        </div>
      </div>
    </div>
  </div>
);

export default injectIntl(ContextualNav);
