import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SectionHeader from 'components/SectionHeader';
import citySealImg from 'images/coa_seal_color_200x200.png';
import { useIntl } from 'react-intl';
import { misc as i18n, news as i18n2 } from 'js/i18n/definitions';

const PageHeader = ({ description, subDescription, children, contentType, columnWidth, date }) => {
  const intl = useIntl();
  console.log("subDescription :", subDescription)
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
                  {intl.formatMessage(i18n2.news)}
                </div>
              </>
            )
            : null}
            {date && (
              <span className="coa-OfficialDocumentPage__date">
                {date}
              </span>
            )}
            <h1>
              {children}
            </h1>
            {description && (
              <p className="coa-PageHeader__description">
                {description}
              </p>
            </>)}
            {subDescription && (
              <div>
                {/*
                  NEEDS MICROCOPY in ES!
                */}
                <div className="coa-OfficialDocumentCollection__documentCount">
                  {documents.length} document{document.length === 1 ? "" : "s"} in this collection
                </div>
              </div>
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
  date: PropTypes.string,
};

export default PageHeader;
