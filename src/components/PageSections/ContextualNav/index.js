import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';

const ContextualNav = props => (
  <div className="coa-ContextualNav">
    <div className="wrapper container-fluid">
      <div className="coa-ContextualNav__container">
        <div className="coa-ContextualNav__parent">
          <a
            href={'/' + props.parent.theme.slug + '/' + props.parent.slug}
            className="coa-ContextualNav__arrow"
          >
            <i className="material-icons">arrow_back</i>
            <span>{props.parent.title}</span>
          </a>
        </div>
        <div className="coa-ContextualNav__related">
          <span className="coa-ContextualNav__label">Related to: </span>
          {props.related.edges.map((topic, index) => (
            <a
              key={index}
              href={
                '/' + topic.node.topic.theme.slug + '/' + topic.node.topic.slug
              }
            >
              {topic.node.topic.title}
            </a>
          ))}
        </div>
        <div className="coa-ContextualNav__dept">
          {props.dept && (
            <Fragment>
              <span className="coa-ContextualNav__label">Offered by: </span>
              <a>Dept</a>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default injectIntl(ContextualNav);
