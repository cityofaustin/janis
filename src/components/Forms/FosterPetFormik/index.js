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

import { multiStepSchema } from 'components/Forms/FosterPetFormik/schema';
import '/app/node_modules/bootstrap/dist/css/bootstrap.min.css';

const log = type => console.log.bind(console, type);

class FosterPetFormik extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="wrapper container-fluid FosterPetFormikik">
        <div className="row">
          <PageHeader
            title="Austin Animal Center Foster Care Application"
            hasBorder={true}
            description="test form using Formik"
          />
          <div className="col-md-8">
            <Progress x={this.state.step} y={7} />
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

FosterPetFormik.propTypes = {};

export default withRouteData(injectIntl(FosterPetFormik));
