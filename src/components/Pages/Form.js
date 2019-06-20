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

const FormikField = ({ fieldNode }) => {
  // debugger;
  switch (fieldNode.fieldType) {
    case 'SINGLELINE':
      return (
        <Field
          type="text"
          name={slugify(fieldNode.label)}
          id={`id_${slugify(fieldNode.label)}`}
        />
      );
    case 'NUMBER':
      return (
        <Field
          type="number"
          name={slugify(fieldNode.label)}
          id={`id_${slugify(fieldNode.label)}`}
        />
      );
    case 'EMAIL':
      return (
        <Field
          type="email"
          name={slugify(fieldNode.label)}
          id={`id_${slugify(fieldNode.label)}`}
        />
      );
    case 'DATETIME':
      return (
        <Field
          type="datetime"
          name={slugify(fieldNode.label)}
          id={`id_${slugify(fieldNode.label)}`}
        />
      );
    case 'MULTILINE':
      return (
        <Field
          component="textarea"
          name={slugify(fieldNode.label)}
          id={`id_${slugify(fieldNode.label)}`}
        />
      );
  }

  return <div>Had a problem rendering this field</div>;
};

class FormikForm extends Component {
  renderFormFields = props => {
    const formFields = this.props.form.formFields.edges;

    return (
      <React.Fragment>
        {formFields.map(formField => {
          console.log(formField);

          return (
            <React.Fragment>
              <label
                htmlFor={`id_${slugify(formField.node.label)}`}
                style={{ display: 'block' }}
              >
                <h4>{formField.node.label}</h4>
                <p>{formField.node.helpText}</p>
                <p>{formField.node.fieldType}</p>
              </label>
              <FormikField fieldNode={formField.node} />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

  // Note from https://github.com/easherma :
  // parses initial values...this seems like a bad place for this? (note from https://github.com/easherma)
  // Response from https://github.com/briaguya
  // following patterns from here: http://www.fullstackstudent.com/dynamic-react-form-with-formik/
  // seems fine to me
  getInitialValues = () => {
    const formFields = this.props.form.formFields.edges;
    let initialValues = formFields.map(formField => {
      return {
        [slugify(formField.node.label)]: formField.node.defaultValue,
      };
    });
    // merge these into a single object to pass to formik
    initialValues = Object.assign({}, ...initialValues);
    return initialValues;
  };

  render() {
    // debugger;
    return (
      <div>
        <Formik
          initialValues={this.getInitialValues()}
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
              url: `https://joplin-pr-2308-wagtail-forms.herokuapp.com/${
                this.props.form.slug
              }/`,
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
              {this.renderFormFields(props)}
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <button type="submit">Submit</button>
            </Form>
          )}
        />
      </div>
    );
  }
}

const FormPage = props => {
  return (
    <section className="wrapper wrapper--sm">
      <h1>{props.form.node.title} </h1>️
      {/* <DynamicForm form={props.form.node} /> */}
      <FormikForm form={props.form.node} />
    </section>
  );
};

export default withRouteData(FormPage);
