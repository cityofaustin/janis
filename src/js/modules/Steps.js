import React from 'react';

const Steps = ({ steps }) => (
  <div className="coa-Steps">
    <h2 className="coa-Steps__title">Steps</h2>
    <div className="coa-Steps__list" dangerouslySetInnerHTML={{__html: steps}} />
  </div>
);

export default Steps;
