import React, { Component } from 'react';
import { withRouteData } from 'react-static';
import { Formik } from 'formik';

const BasicExample = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{ name: 'jared' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
            name="name"
          />
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button type="submit">Submit</button>
        </form>
      )}
    />
  </div>
);

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
      <BasicExample />
    </section>
  );
};

export default withRouteData(Form);
