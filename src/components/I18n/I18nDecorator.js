import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { find } from 'lodash';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';

const I18nDecorator = ({ children, intl }) => {
  const languageDirection = find(SUPPORTED_LANGUAGES, { code: intl.locale })
    .direction;
  return (
    <div dir={languageDirection} className={`coa-${languageDirection}`}>
      {children}
    </div>
  );
};

I18nDecorator.propTypes = {
  children: PropTypes.node.isRequired,
};

export default injectIntl(I18nDecorator);
