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

const BasicExample = props => {
  const getInitialValues = () => {
    const formFields = props.form.node.formFields.edges;
    let initialValues = formFields.map(formField => {
      return {
        [slugify(formField.node.label)]: formField.node.defaultValue,
      };
    });
    // merge these into a single object to pass to formik
    initialValues = Object.assign({}, ...initialValues);
    return initialValues;
  };
  return (
    <div>
      <Formik
        initialValues={getInitialValues()}
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
            url:
              'https://joplin-pr-2308-wagtail-forms.herokuapp.com/test-form/',
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
              name="text"
              value="Text"
            />

            <Field component="select" name="select">
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
};

const FormPage = props => {
  console.log(props.form);

  return (
    <section className="wrapper wrapper--sm">
      <h1>{props.form.node.title} </h1>️
      <div> {slugify(props.form.node.formFields.edges[1].node.label)}</div>
      <BasicExample {...props} />
    </section>
  );
};

export default withRouteData(FormPage);
