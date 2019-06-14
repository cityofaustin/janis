import React, { Component } from 'react';
import { withRouteData } from 'react-static';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

const BasicExample = props => (
  <div>
    <Formik
      initialValues={props.form.node.formFields.edges}
      onSubmit={(values, actions) => {
        // use FormData api to make body for POST request:
        //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
        let body = new FormData();
        // Formik passes form values, add these to the body
        for (const key in values) {
          body.set(key, values[key]);
        }
        axios({
          method: 'post',
          url: 'https://joplin-pr-2308-wagtail-forms.herokuapp.com/test-form/',
          data: body,
          config: { headers: { 'Content-Type': 'multipart/form-data' } },
        })
          .then(function(response) {
            //handle success
            console.log(response);
          })
          .catch(function(response) {
            //handle error
            console.log(response);
          });
      }}
      render={props => (
        <Form>
          <Field
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            name={slugify(props.values[1].node.label)}
            value={props.values[1].node.defaultValue}
          />
          <Field component="select" name={slugify(props.values[0].node.label)}>
            <option value="cool">cool</option>
            <option value="not-cool">not-cool</option>
          </Field>
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  </div>
);

const FormPage = props => {
  console.log(props.form);

  // const formFields = props.form.node.formFields.edges.map((item, key) => (
  //   <li>
  //     <p key={item.id}>{item.node.fieldType}</p>
  //     <p key={item.id}>{item.node.choices}</p>
  //   </li>
  // ));

  // parsedFormFields.map(field => ( console.log(field.label)))

  return (
    <section className="wrapper wrapper--sm">
      <h1>{props.form.node.title} </h1>️
      <BasicExample {...props} />
    </section>
  );
};

export default withRouteData(FormPage);
