import React from 'react';

const HtmlFromAdmin = ({content}) => (
  <div className="coa-HtmlFromAdmin" dangerouslySetInnerHTML={{__html: content}} />
);

export default HtmlFromAdmin;
