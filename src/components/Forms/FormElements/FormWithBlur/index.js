import Form from 'react-jsonschema-form';

export default class FormWithBlur extends Form {
  constructor(props) {
    super(props);
    const superOnBlur = this.onBlur;

    this.onBlur = (...args) => {
      const { formData } = this.state;
      const { errors, errorSchema } = this.validate(formData);
      console.log('blur', formData);
      this.setState({ errors, errorSchema }, () => superOnBlur(...args));
    };
  }
}
