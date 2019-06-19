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

const FormikForm = ({ form }) => {
  // parses initial values...this seems like a bad place for this?
  const getInitialValues = () => {
    const formFields = form.formFields.edges;
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
            // obvs should pull in from an env variable at some point
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
          // need to pass props or values dynamically here or refactor to make
          // that possible
          <Form>
            <Field
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values['tell-us-why']}
              name="tell-us-why"
            />
            <Field component="select" name="how-cool-is-this-form">
              <option value="cool">cool</option>
              <option value="not cool">not-cool</option>
            </Field>
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </div>
  );
};

const FormFields = ({ fields }) =>
  // thought here would be to have a component that loops through formFields
  // and maps backend values to frontend form components
  fields.edges.map((item, key) => (
    <div>
      <input
        key={item.id}
        type={item.node.fieldType}
        name={slugify(item.node.label)}
        defaultValue={item.node.defaultValue}
      />
    </div>
  ));
const FormPage = props => {
  console.log(props.form);

  return (
    <section className="wrapper wrapper--sm">
      <h1>{props.form.node.title} </h1>️
      <FormikForm form={props.form.node} />
    </section>
  );
};

export default withRouteData(FormPage);
