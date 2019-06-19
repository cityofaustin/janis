import React, { Component } from 'react';
import { withRouteData } from 'react-static';
import axios from 'axios';
import { Formik, Form, Field, withFormik } from 'formik';

// failed experient using 'withFormik' HOC

// form page (parent?)
// formikedForm ( handle submit w formik)
// formFields (return fields based on backend for the page)

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

const formSchema = props => {
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
  console.log(props.form);
};

const renderForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name={formName}
      />
      {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

const formikForm = withFormik({
  mapPropsToValues: () => ({ what: '' }),
  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'BasicForm',
});

export default withRouteData(formikForm(renderForm));
