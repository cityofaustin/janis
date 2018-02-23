import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from 'js/modules/SectionHeader';

const ServicesList = ({}) => (
  <div className="wrapper">
    <SectionHeader>
      Use City of Austin Services
    </SectionHeader>
    <p>The City of Austin provides hundreds of services to residents to help them manage things like recycling, trash, energy, and water. This is a short list of services that will grow over time.</p>
  </div>
);

ServicesList.propTypes = {
  // : PropTypes.
};

export default ServicesList;
