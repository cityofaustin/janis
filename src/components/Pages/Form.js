import React, { Component } from 'react';
import { withRouteData } from 'react-static';

const Form = props => {
  console.log(props.form);

  const formFields = props.form.node.formFields.edges.map((item, key) => (
    <li>
      <p key={item.id}>{item.node.fieldType}</p>
      <p key={item.id}>{item.node.choices}</p>
    </li>
  ));

  return (
    <section className="wrapper wrapper--sm">
      <h1>{props.form.node.title} </h1>️
      <form action="http://localhost:8000/test-form/" method="POST">
        {formFields}
        <input type="submit" />
      </form>
    </section>
  );
};

export default withRouteData(Form);
