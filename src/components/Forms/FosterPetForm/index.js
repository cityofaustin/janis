import React, { Component } from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import Email from 'components/Contact/Email';
import Phone from 'components/Contact/Phone';
import Progress from 'components/Progress';

import { multiStepSchema } from 'components/Forms/FosterPetForm/schema';

const log = type => console.log.bind(console, type);

class FosterPetForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.state = { step: 1 };
  }
  handleSubmit() {
    log('submitted');
    let nextStep = Number(this.state.step) + 1;
    this.setState({ step: nextStep });
    return;
  }
  handleBack() {
    log('back');
    let previousStep = Number(this.state.step) - 1;
    this.setState({
      step: previousStep,
    });
    return;
  }
  render() {
    return (
      <div className="wrapper container-fluid">
        <div className="row">
          <PageHeader
            title="Austin Animal Center Foster Care Application"
            hasBorder={true}
            description="test form using react-jsonschema-form"
          />
          <div className="col-md-8">
            <Progress x={this.state.step} y={7} />
            <Form
              schema={multiStepSchema[this.state.step].schema}
              uiSchema={multiStepSchema[this.state.step].ui}
              onChange={log('changed')}
              onSubmit={this.handleSubmit}
              onError={log('errors')}
            >
              <button type="submit">Next</button>
              <button type="button" onClick={this.handleBack}>
                Back
              </button>
            </Form>
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

export default withRouteData(injectIntl(FosterPetForm));
