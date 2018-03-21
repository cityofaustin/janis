import React from 'react';

const HtmlFromAdmin = ({content}) => (
  <div className="coa-HtmlFromAdmin">
    <h2 className="coa-HtmlFromAdmin__title">What else do I need to know?</h2>
    <div className="coa-HtmlFromAdmin__content" dangerouslySetInnerHTML={{__html: content}} />
  </div>
);

export default HtmlFromAdmin;
