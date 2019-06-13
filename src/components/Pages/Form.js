import React, { Component } from 'react';
import { withRouteData } from 'react-static';

const Form = props => {
  console.log(props.form);

  const formFields = props.form.node.formFields.edges.map((item, key) => (
    <form>
      <p key={item.id}>{item.node.fieldType}</p>
      <p key={item.id}>{item.node.choices}</p>
    </form>
  ));

  return (
    <section className="wrapper wrapper--sm">
      <h1>{props.form.node.title} </h1>️
      {formFields}
    </section>
  );
};

export default withRouteData(Form);
