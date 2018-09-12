import React from 'react';
import ProgressButton from 'us-forms-system/lib/js/components/ProgressButton';
import FormTitle from 'us-forms-system/lib/js/components/FormTitle';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.startForm = this.startForm.bind(this);
  }

  startForm() {
    const firstPage = this.props.route.pageList[1].path;
    this.props.router.push(firstPage);
  }

  render() {
    return (
      <div className="schemaform-intro">
        <FormTitle title="Parking Permit Application"/>
        <h2>🅿️ Fill out the residential street parking permit application</h2>
        <p>Thank you for applying for your residential street parking permit. This helps us ensure residents and their guests have areas to park while maintaining street safety.</p>
        <h3>Types of Permits</h3>
        <ol>
          <li>Yearly</li>
          <li>24 hour</li>
          <li>Contractor</li>
        </ol>
        <ProgressButton
          onButtonClick={this.startForm}
          buttonText="Start Form"
          buttonClass="usa-button-primary schemaform-start-button"
          afterText="»"/>
      </div>
    );
  }
}

export default Introduction;
