// this is a helper function for the jest snapshot tests
// https://github.com/formatjs/react-intl/blob/master/docs/Testing-with-React-Intl.md#snapshot-testing

import React from 'react';
import renderer from 'react-test-renderer';
import {IntlProvider} from 'react-intl';

const createComponentWithIntl = (children, props = {locale: 'en'}) => {
  return renderer.create(<IntlProvider {...props}>{children}</IntlProvider>);
};

export default createComponentWithIntl;
