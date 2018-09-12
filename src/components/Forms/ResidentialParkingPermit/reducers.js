import formConfig from './config/form';
import createSchemaFormReducer from 'us-forms-system/lib/js/state';

export default {
  form: createSchemaFormReducer(formConfig)
};
