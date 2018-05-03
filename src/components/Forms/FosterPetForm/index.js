import React from 'react';
import { withRouteData } from 'react-static';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import PageHeader from 'components/PageHeader';
import SectionHeader from 'components/SectionHeader';
import Email from 'components/Contact/Email';
import Phone from 'components/Contact/Phone';

import Form from 'react-jsonschema-form';

const schema = {
  title: 'Tell us how to contact you',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    email: {
      type: 'string',
      title: 'Email',
      format: 'email',
    },
    telephone: {
      type: 'integer',
      title: 'Phone Number',
      minLength: 10,
    },
    address1: {
      type: 'string',
      title: 'Street Address 1',
    },
    address2: {
      type: 'string',
      title: 'Street Address 2',
    },
    city: {
      type: 'string',
      title: 'City',
    },
    state: {
      type: 'string',
      title: 'State',
    },
    zip: {
      type: 'string',
      title: 'ZIP',
    },
  },
};

const uiSchema = {
  firstName: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
  },
  email: {
    'ui:widget': 'email',
    'ui:title': 'Email',
  },
  telephone: {
    'ui:options': {
      inputType: 'tel',
    },
    'ui:help': 'Enter a 10 digit phone number',
  },
};

const log = type => console.log.bind(console, type);

const FosterPetForm = ({}) => {
  return (
    <div className="wrapper container-fluid">
      <div className="row">
        <PageHeader
          title="Austin Animal Center Foster Care Application"
          hasBorder={true}
          description="test form using react-jsonschema-form"
        />
        <div className="col-md-8">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            onChange={log('changed')}
            onSubmit={log('submitted')}
            onError={log('errors')}
          />
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
};

FosterPetForm.propTypes = {};

export default withRouteData(injectIntl(FosterPetForm));
