import React from 'react';

const Steps = ({ steps }) => (
  <div className="coa-Steps" dangerouslySetInnerHTML={{__html: steps}} />
);

export default Steps;
