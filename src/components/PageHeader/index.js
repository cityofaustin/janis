import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SectionHeader from 'components/SectionHeader';
import citySealImg from 'images/coa_seal_color.png';
import { useIntl } from 'react-intl';
import { misc as i18n } from 'js/i18n/definitions';

const PageHeader = ({ description, children, contentType, columnWidth }) => {
  const intl = useIntl();
  return (
    <div
      className={
        'coa-PageHeader ' +
        (contentType ? `coa-PageHeader--${contentType}` : '')
      }
    >
      <div className="wrapper container-fluid">
        <div className="row">
          <div
            className={'col-xs-12 col-md-' + (columnWidth ? columnWidth : '8')}
          >
            {contentType && contentType === 'news' ? (
              <>
                <div className="coa-PageHeader--news__city-seal-wrapper">
                  <img
                    src={citySealImg}
                    alt={intl.formatMessage(i18n.citySeal)}
                  />
                </div>
                <div className="coa-PageHeader--news__release-text">
                  Media release
                </div>
              </>
            ) : null}

            <h1>{children}</h1>
            {description && (
              <p className="coa-PageHeader__description">{description}</p>
            )}

            {contentType && contentType === 'information' ? (
              <SectionHeader />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
};

export default PageHeader;
