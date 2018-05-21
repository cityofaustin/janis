import React, { Component } from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

import FormWithBlur from 'components/Forms/FormElements/FormWithBlur';
import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import Email from 'components/Contact/Email';
import Phone from 'components/Contact/Phone';
import Progress from 'components/Progress';

import { multiStepSchema } from 'components/Forms/FosterPetForm/schema';
import '/app/node_modules/bootstrap/dist/css/bootstrap.min.css';

const log = type => console.log.bind(console, type);

class FosterPetForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      step: 1,
      schema: multiStepSchema[1].schema,
      uiSchema: multiStepSchema[1].ui,
    };
  }
  handleSubmit() {
    let nextStep = Number(this.state.step) + 1;
    this.setState({
      step: nextStep,
      schema: multiStepSchema[nextStep].schema,
      uiSchema: multiStepSchema[nextStep].ui,
      formData: {
        isOver18: null,
      },
    });
    return;
  }
  handleBack() {
    let previousStep = Number(this.state.step) - 1;
    this.setState({
      step: previousStep,
      schema: multiStepSchema[previousStep].schema,
      uiSchema: multiStepSchema[previousStep].ui,
    });
    return;
  }
  handleChange(data) {
    const schema = { ...this.state.schema };
    const uiSchema = { ...this.state.uiSchema };
    const { formData } = data;
    console.log('inside handleChange');

    const newState = processFormForConditionals(
      this.originalSchema,
      this.originalUISchema,
      schema,
      uiSchema,
      formData,
    );
    console.log(newState);

    this.setState(newState);
  }
  render() {
    return (
      <div className="wrapper container-fluid FosterPetForm">
        <div className="row">
          <PageHeader
            title="Austin Animal Center Foster Care Application"
            hasBorder={true}
          />
          <div className="col-md-8">
            <Progress x={this.state.step} y={7} />
            <FormWithBlur
              schema={this.state.schema}
              uiSchema={this.state.uiSchema}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              onError={console.log('errors')}
              allowOnBlur={true}
              formData={this.state.formData}
              widgets={multiStepSchema.widgets}
            >
              <button type="submit">Next</button>
              <button type="button" onClick={this.handleBack}>
                Back
              </button>
            </FormWithBlur>
          </div>
          <div className="col-md-4">
            <SectionHeader>Contact</SectionHeader>
            <h3>Foster Care Coordinators</h3>
            <Email email="animal.foster@austintexas.gov" />
            <Phone phone={{ default: '512-978-0541' }} />
          </div>
        </div>
      </div>
    );
  }
}

FosterPetForm.propTypes = {};

// TODO: This should be abstracted to extend the Form component in a seperate class(?)
// Currently using advanced conditional example
// https://jsfiddle.net/cowbellerina/zbfh96b1/

/**
 * Calculate new state for form based on UI Schema field conditions and current form data
 *
 * @param originalSchema - Original full schema containing all possible fields
 * @param originalUISchema - Original full UI Schema containing all possible fields
 * @param schema - Current schema
 * @param uiSchema - Current UI schema
 * @param formData - Current form data
 * @return {object} - Object containing new schema, uiSchema, and formData
 */
function processFormForConditionals(
  originalSchema,
  originalUISchema,
  schema,
  uiSchema,
  formData,
) {
  let newSchema, newUISchema, newFormData;

  let conditionalFields = _.pickBy(uiSchema, field =>
    field.hasOwnProperty('condition'),
  );

  if (_.isEmpty(conditionalFields)) {
    return {
      schema,
      uiSchema,
      formData,
    };
  }

  newSchema = _.assign({}, schema);
  newUISchema = _.assign({}, uiSchema);
  newFormData = _.assign({}, formData);

  _.each(conditionalFields, (dependantSchema, dependant) => {
    const { rules, allHaveToMatch } = getConditionRules(
      dependantSchema.condition,
    );
    let matches = [];
    _.each(rules, rule => {
      const { field, values: stringValues, invert } = getConditionRule(rule);
      let visible = invert;

      const values = stringValues.map(value => {
        if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        return value;
      });

      if (field && newFormData.hasOwnProperty(field)) {
        let currentValues = _.isArray(newFormData[field])
          ? newFormData[field]
          : [newFormData[field]];
        _.each(values, value => {
          if (invert) {
            visible = visible && _.indexOf(currentValues, value) === -1;
          } else {
            visible = visible || _.indexOf(currentValues, value) !== -1;
          }
        });
      }

      matches.push(visible);
    });

    // Add or remove conditional field from schema
    let shouldBeVisible = false;
    if (matches.length) {
      shouldBeVisible = allHaveToMatch
        ? // foo=bar && bar=foo
          _.every(matches, Boolean)
        : // foo=bar || bar=foo
          _.some(matches, Boolean);
    }

    if (shouldBeVisible) {
      newSchema.properties[dependant] = originalSchema.properties[dependant];
    } else {
      newSchema.properties = _.omit(newSchema.properties, [dependant]);
      newFormData = _.omit(newFormData, [dependant]);
    }
  });

  // Update UI Schema UI order
  // react-jsonschema-form cannot handle extra properties found in UI order
  newUISchema['ui:order'] = _.intersection(
    originalUISchema['ui:order'],
    _.keys(newSchema.properties),
  );
  // Update Schema required fields
  if (originalSchema.hasOwnProperty('required')) {
    newSchema.required = _.intersection(
      originalSchema.required,
      _.keys(newSchema.properties),
    );
  }

  return {
    schema: newSchema,
    uiSchema: newUISchema,
    formData: newFormData,
  };
}

function getConditionRules(condition = '') {
  let rules = [];
  let allHaveToMatch = false;
  let visible = false;

  // foo=bar || bar=foo
  if (condition.indexOf('||') !== -1) {
    rules = condition.split('||');
    allHaveToMatch = false;
    visible = false;
  }
  // foo=bar && bar=foo
  else if (condition.indexOf('&&') !== -1) {
    rules = condition.split('&&');
    allHaveToMatch = true;
    visible = true;
  }
  // foo=bar
  else {
    rules = [condition];
    allHaveToMatch = true;
    visible = true;
  }

  return {
    rules,
    allHaveToMatch,
    visible,
  };
}

function getConditionRule(conditionRule) {
  let rule = [];
  let invert;

  // foo!=bar
  if (conditionRule.indexOf('!=') !== -1) {
    rule = conditionRule.split('!=');
    invert = true;
  }
  // foo=bar
  else if (conditionRule.indexOf('=') !== -1) {
    rule = conditionRule.split('=');
    invert = false;
  }

  if (rule.length !== 2) {
    return false;
  }

  let [field, values] = rule;

  values = values.split(',');

  return {
    field,
    values,
    invert,
  };
}

export default withRouteData(injectIntl(FosterPetForm));
