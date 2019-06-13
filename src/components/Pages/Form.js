import React, { Component } from 'react';
import { withRouteData } from 'react-static';

const Form = props => {
  console.log(props.form);

  return (
    <section className="wrapper wrapper--sm">
      <h1>Form Page </h1>️<p>just a placeholder</p>
    </section>
  );
};

export default withRouteData(Form);
