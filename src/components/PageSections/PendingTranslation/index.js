import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

import { howYouKnowMenu as i18n } from 'js/i18n/definitions';

const PendingTranslation = ({ open, intl, closeMessage }) => (
  <div
    className={classNames('coa-PendingTranslation', {
      'coa-PendingTranslation--is-open': open,
    })}
  >
    <p>
      Continuamos trabajando y procesando las traducciones en este sitio web.
    </p>
    <p className="coa-PendingTranslation--link">
      Si le gustaría ayudarnos a mejorar, por favor inscríbase{' '}
      <a href={'/es/feedback/'} onClick={closeMessage}>
        para participar en nuestras investigaciones de usuarios.
      </a>
    </p>
  </div>
);

PendingTranslation.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default injectIntl(PendingTranslation);
